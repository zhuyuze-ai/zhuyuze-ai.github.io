// Justified grid, filter buttons and lightbox for the photography page.
(function () {
  const grid = document.querySelector(".photo-grid");
  const lightbox = document.getElementById("photo-lightbox");
  if (!grid || !lightbox) return;

  const items = Array.from(grid.querySelectorAll(".photo-item"));
  const filters = Array.from(document.querySelectorAll(".photo-filter"));
  const SPACING = 10;

  // Justified layout, following rockem/astro-photography-portfolio (which uses
  // Flickr's justified-layout): fill each row until its height drops to the
  // target, keep whichever break lands closer to the target, then scale the
  // row so it spans the container exactly. The last row stays at the target
  // height instead of being stretched.
  function layout() {
    const width = grid.clientWidth;
    if (!width) return;

    const target = parseFloat(getComputedStyle(grid).getPropertyValue("--row-h")) || 280;
    const visible = items.filter((it) => !it.hidden);
    const caption = visible.length ? visible[0].querySelector(".photo-caption") : null;
    const capH = caption ? caption.offsetHeight : 0;
    const ratio = (it) => parseFloat(it.dataset.ar) || 1.5;
    const rowHeight = (row) => (width - SPACING * (row.length - 1)) / row.reduce((s, it) => s + ratio(it), 0);

    let top = 0;
    const place = (row, h) => {
      let left = 0;
      row.forEach((it, i) => {
        // Give the last photo the leftover width so the row edge is exact.
        const w = i === row.length - 1 && h !== target ? width - left : h * ratio(it);
        it.style.left = `${left}px`;
        it.style.top = `${top}px`;
        it.style.width = `${w}px`;
        it.style.setProperty("--tile-h", `${h}px`);
        left += w + SPACING;
      });
      top += h + capH + SPACING;
    };

    let row = [];
    visible.forEach((it) => {
      row.push(it);
      const h = rowHeight(row);
      if (h > target) return;

      if (row.length > 1) {
        const without = row.slice(0, -1);
        const hWithout = rowHeight(without);
        if (Math.abs(hWithout - target) < Math.abs(h - target)) {
          place(without, hWithout);
          row = [it];
          if (rowHeight(row) <= target) {
            place(row, rowHeight(row));
            row = [];
          }
          return;
        }
      }
      place(row, h);
      row = [];
    });
    if (row.length) place(row, target);

    grid.style.height = `${Math.max(0, top - SPACING)}px`;
    grid.classList.add("is-justified");
  }

  let frame = 0;
  let lastWidth = 0;
  new ResizeObserver(() => {
    if (grid.clientWidth === lastWidth) return;
    lastWidth = grid.clientWidth;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  }).observe(grid);

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
    layout();
  }

  filters.forEach((btn) => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));

  // Lightbox
  const img = lightbox.querySelector(".photo-lightbox-img");
  const text = lightbox.querySelector(".photo-lightbox-caption");
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

    text.textContent = d.caption || "";
    lightbox.classList.toggle("has-caption", Boolean(d.caption));

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
