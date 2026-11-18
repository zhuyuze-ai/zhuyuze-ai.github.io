// Stacked portrait prints on the about page. Arrows (or a swipe) cycle the
// stack; clicking the front print opens the same lightbox as the photography
// page (markup and styles shared with assets/js/photography.js and
// _sass/_photography.scss), and paging in the lightbox keeps the stack in sync.
(function () {
  function init() {
    const root = document.querySelector(".portrait");
    if (!root || root.dataset.portraitReady === "true") return;
    root.dataset.portraitReady = "true";

    const stack = root.querySelector(".portrait-stack");
    const prints = Array.from(root.querySelectorAll(".portrait-print"));
    const dots = Array.from(root.querySelectorAll(".portrait-dot"));
    const images = prints.map((p) => p.querySelector("img"));
    const lightbox = root.querySelector(".portrait-lightbox");
    if (!stack || prints.length === 0 || !lightbox) return;

    // Move the lightbox to <body> so the profile column's own styles
    // (figure frame, hover lift, entrance transform) never reach it.
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector(".photo-lightbox-img");
    const text = lightbox.querySelector(".photo-lightbox-caption");
    const closeBtn = lightbox.querySelector(".photo-lightbox-close");
    const prevBtn = lightbox.querySelector(".photo-lightbox-prev");
    const nextBtn = lightbox.querySelector(".photo-lightbox-next");
    const multiple = prints.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;

    let current = 0;
    let lastFocus = null;
    const isOpen = () => lightbox.classList.contains("is-open");

    function renderStack() {
      const n = prints.length;
      prints.forEach((print, i) => {
        const offset = (i - current + n) % n;
        print.setAttribute("data-position", String(Math.min(offset, 3)));
        if (offset === 0) print.removeAttribute("aria-hidden");
        else print.setAttribute("aria-hidden", "true");
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-current", i === current));
    }

    // Same sizing rule as the photography lightbox: fit inside the backdrop
    // padding, leave room for the caption, stay under 85% of the viewport
    // height and never upscale past the photo's own pixels.
    function fit() {
      const source = images[current];
      const w = source.naturalWidth || Number(source.getAttribute("width")) || 1;
      const h = source.naturalHeight || Number(source.getAttribute("height")) || 1;
      const pad = parseFloat(getComputedStyle(lightbox).paddingTop) || 0;
      const cap = text.textContent ? text.offsetHeight + parseFloat(getComputedStyle(text).marginTop) : 0;
      const maxW = lightbox.clientWidth - 2 * pad;
      const maxH = Math.min(window.innerHeight * 0.85, lightbox.clientHeight - 2 * pad - cap);
      const scale = Math.min(maxW / w, maxH / h, 1);
      img.style.width = `${Math.floor(w * scale)}px`;
      img.style.height = `${Math.floor(h * scale)}px`;
    }

    function showInLightbox() {
      const source = images[current];
      const src = source.currentSrc || source.src;
      img.alt = source.alt || "";
      text.textContent = source.dataset.caption || "";
      fit();
      if (img.getAttribute("src") !== src) {
        img.classList.add("is-loading");
        img.src = src;
      }
    }

    const reveal = () => img.classList.remove("is-loading");
    img.addEventListener("load", reveal);
    img.addEventListener("error", reveal);

    function step(delta) {
      current = (current + delta + prints.length) % prints.length;
      renderStack();
      if (isOpen()) showInLightbox();
    }

    function open() {
      if (isOpen()) return;
      lastFocus = document.activeElement;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("photo-lightbox-open");
      showInLightbox();
      closeBtn.focus();
    }

    function close() {
      if (!isOpen()) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("photo-lightbox-open");
      img.removeAttribute("src");
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }

    // Stack controls
    const prev = root.querySelector(".portrait-arrow--prev");
    const next = root.querySelector(".portrait-arrow--next");
    const expand = root.querySelector(".portrait-expand");
    const onArrow = (delta) => (e) => {
      e.stopPropagation();
      step(delta);
    };
    if (prev) prev.addEventListener("click", onArrow(-1));
    if (next) next.addEventListener("click", onArrow(1));
    if (expand)
      expand.addEventListener("click", (e) => {
        e.stopPropagation();
        open();
      });
    stack.addEventListener("click", open);
    stack.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });

    // Lightbox controls (same behaviour as the photography page)
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("photo-lightbox-figure")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!isOpen()) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
    window.addEventListener("resize", () => {
      if (isOpen()) fit();
    });

    // Swipe left/right on touch screens, on the stack and in the lightbox.
    function addSwipe(el, threshold) {
      let touchX = null;
      el.addEventListener(
        "touchstart",
        (e) => {
          touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
        },
        { passive: true }
      );
      el.addEventListener("touchend", (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > threshold) {
          if (el === stack) e.preventDefault(); // don't also open the lightbox
          step(dx < 0 ? 1 : -1);
        }
      });
    }
    addSwipe(stack, 40);
    addSwipe(lightbox, 50);

    renderStack();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
