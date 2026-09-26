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
  let seq = 0; // invalidates a pending full-size swap when the photo changes
  let lastFocus = null;

  // Fit the photo inside the backdrop padding, leaving room for the caption
  // and never exceeding 85% of the viewport height or its own pixel size. The
  // box is fixed from the aspect ratio, so the small preview and the full
  // image occupy exactly the same space.
  function fit() {
    if (index < 0) return;
    const d = visible[index].querySelector(".photo-tile").dataset;
    const w = Number(d.w);
    const h = Number(d.h);
    const pad = parseFloat(getComputedStyle(lightbox).paddingTop) || 0;
    const cap = text.textContent ? text.offsetHeight + parseFloat(getComputedStyle(text).marginTop) : 0;
    const maxW = lightbox.clientWidth - 2 * pad;
    const maxH = Math.min(window.innerHeight * 0.85, lightbox.clientHeight - 2 * pad - cap);
    const scale = Math.min(maxW / w, maxH / h, 1);
    img.style.width = `${Math.floor(w * scale)}px`;
    img.style.height = `${Math.floor(h * scale)}px`;
  }

  function show(i) {
    const next = (i + visible.length) % visible.length;
    const same = next === index && img.getAttribute("src");
    index = next;
    const tile = visible[index].querySelector(".photo-tile");
    const d = tile.dataset;

    img.alt = d.alt || "";
    text.textContent = d.caption || "";
    fit();
    if (same) return;

    // As in XD-QIN/astro-photo-folio: show the rendition the grid already
    // downloaded right away (kept hidden until it loads, so the previous photo
    // never flashes), then swap in the full image once it has decoded.
    const ticket = ++seq;
    const thumb = tile.querySelector(".photo-img");
    const preview = (thumb && thumb.currentSrc) || "";
    img.classList.add("is-loading");
    img.src = preview || d.full;
    if (!preview || preview === d.full) return;

    const full = new Image();
    full.src = d.full;
    const apply = () => {
      if (ticket === seq) img.src = d.full;
    };
    if (full.decode) full.decode().then(apply, () => {});
    else full.onload = apply;
  }

  const reveal = () => img.classList.remove("is-loading");
  img.addEventListener("load", reveal);
  img.addEventListener("error", reveal);

  function open(item) {
    visible = items.filter((it) => !it.hidden);
    lastFocus = document.activeElement;
    const multiple = visible.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-lightbox-open");
    show(visible.indexOf(item));
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("photo-lightbox-open");
    seq++;
    index = -1;
    img.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  window.addEventListener("resize", () => {
    if (lightbox.classList.contains("is-open")) fit();
  });

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
