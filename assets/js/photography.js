// Filter buttons and lightbox for the photography page.
(function () {
  const grid = document.querySelector(".photo-grid");
  const lightbox = document.getElementById("photo-lightbox");
  if (!grid || !lightbox) return;

  const items = Array.from(grid.querySelectorAll(".photo-item"));
  const filters = Array.from(document.querySelectorAll(".photo-filter"));

  // Filtering
  function applyFilter(filter) {
    filters.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    items.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  }

  filters.forEach((btn) => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));

  // Lightbox
  const img = lightbox.querySelector(".photo-lightbox-img");
  const title = lightbox.querySelector(".photo-lightbox-caption .photo-caption-title");
  const text = lightbox.querySelector(".photo-lightbox-text");
  const closeBtn = lightbox.querySelector(".photo-lightbox-close");
  const prevBtn = lightbox.querySelector(".photo-lightbox-prev");
  const nextBtn = lightbox.querySelector(".photo-lightbox-next");

  let visible = [];
  let index = -1;
  let lastFocus = null;

  function show(i) {
    index = (i + visible.length) % visible.length;
    const tile = visible[index].querySelector(".photo-tile");
    const d = tile.dataset;

    img.style.setProperty("--ar", String(Number(d.w) / Number(d.h)));
    img.style.setProperty("--pw", d.w);
    // Show the already-loaded thumbnail first, then swap in the full image.
    const thumb = tile.querySelector(".photo-img");
    img.src = (thumb && thumb.currentSrc) || d.full;
    img.alt = d.alt || "";
    const full = new Image();
    full.onload = () => {
      if (visible[index] && visible[index].querySelector(".photo-tile") === tile) img.src = d.full;
    };
    full.src = d.full;

    title.textContent = d.title || "";
    title.hidden = !d.title;
    text.textContent = d.caption || "";
    lightbox.classList.toggle("has-caption", Boolean(d.title || d.caption));

    const multiple = visible.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  }

  function open(item) {
    visible = items.filter((it) => !it.hidden);
    lastFocus = document.activeElement;
    show(visible.indexOf(item));
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-lightbox-open");
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("photo-lightbox-open");
    img.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  items.forEach((item) => item.querySelector(".photo-tile").addEventListener("click", () => open(item)));

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => show(index - 1));
  nextBtn.addEventListener("click", () => show(index + 1));

  // Clicking the dark backdrop (not the photo or controls) closes the viewer.
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("photo-lightbox-figure")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });

  // Swipe left/right on touch screens.
  let touchX = null;
  lightbox.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) show(dx > 0 ? index - 1 : index + 1);
  });
})();
