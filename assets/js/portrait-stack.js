// Stacked portrait prints on the about page: arrows cycle the stack, and
// clicking the front print opens it in a modal viewer that animates from the
// print's position.
(function () {
  function init() {
    var root = document.querySelector(".portrait");
    if (!root || root.dataset.portraitReady === "true") return;
    root.dataset.portraitReady = "true";

    var stack = root.querySelector(".portrait-stack");
    var prev = root.querySelector(".portrait-arrow--prev");
    var next = root.querySelector(".portrait-arrow--next");
    var expand = root.querySelector(".portrait-expand");
    var viewer = root.querySelector(".portrait-viewer");
    var frame = root.querySelector(".portrait-full-frame");
    var fullImage = root.querySelector(".portrait-full-image");
    var locationEl = root.querySelector(".portrait-full-location");
    var closeBtn = root.querySelector(".portrait-close");
    var viewerPrev = root.querySelector(".portrait-viewer-arrow--prev");
    var viewerNext = root.querySelector(".portrait-viewer-arrow--next");
    if (!stack || !viewer || !frame || !fullImage || !closeBtn) return;

    var prints = Array.prototype.slice.call(stack.querySelectorAll(".portrait-print"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".portrait-dot"));
    var images = prints.map(function (p) {
      return p.querySelector("img");
    });
    if (prints.length === 0) return;

    var current = 0;
    var busy = false;
    var fromRect = { left: 0, top: 0, width: 0, height: 0 };
    var toRect = { left: 0, top: 0, width: 0, height: 0 };
    var canDialog = typeof viewer.showModal === "function";

    function clamp(v, lo, hi) {
      return Math.max(lo, Math.min(hi, v));
    }
    function toStyle(r) {
      return { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" };
    }
    function reducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function printRect() {
      var el = (prints[current] && prints[current].querySelector(".portrait-window")) || stack;
      var r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, width: r.width, height: r.height };
    }
    function viewerRect(origin) {
      var maxW = Math.min(920, window.innerWidth - 56);
      var maxH = Math.min(window.innerHeight - 56, 900);
      var nw = fullImage.naturalWidth || origin.width;
      var nh = fullImage.naturalHeight || origin.height;
      var ratio = nw / Math.max(nh, 1);
      var w = maxW;
      var h = w / ratio;
      if (h > maxH) {
        h = maxH;
        w = h * ratio;
      }
      var cx = origin.left + origin.width / 2;
      var cy = origin.top + origin.height / 2;
      return {
        width: w,
        height: h,
        left: clamp(cx - w / 2, 28, window.innerWidth - 28 - w),
        top: clamp(cy - h / 2, 28, window.innerHeight - 28 - h),
      };
    }

    function render() {
      var n = prints.length;
      prints.forEach(function (print, i) {
        var offset = (i - current + n) % n;
        print.setAttribute("data-position", String(Math.min(offset, 3)));
        if (offset === 0) print.removeAttribute("aria-hidden");
        else print.setAttribute("aria-hidden", "true");
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-current", i === current);
      });
      var img = images[current];
      if (img) {
        fullImage.src = img.currentSrc || img.src;
        fullImage.alt = img.alt;
        var loc = img.dataset.location || "";
        if (locationEl) {
          locationEl.textContent = loc;
          locationEl.hidden = loc.length === 0;
        }
      }
    }

    function relayout() {
      fromRect = printRect();
      toRect = viewerRect(fromRect);
      Object.assign(frame.style, toStyle(toRect));
    }

    function animateFrame(a, b) {
      Object.assign(frame.style, toStyle(b));
      if (reducedMotion() || typeof frame.animate !== "function") return Promise.resolve();
      return frame.animate([toStyle(a), toStyle(b)], { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }).finished.catch(function () {});
    }

    function decodeFull() {
      return fullImage.decode ? fullImage.decode().catch(function () {}) : Promise.resolve();
    }

    function step(delta) {
      current = (current + delta + prints.length) % prints.length;
      render();
      if (viewer.open) {
        decodeFull().then(function () {
          if (viewer.open) relayout();
        });
      }
    }

    function open() {
      if (busy || viewer.open) return;
      if (!canDialog) {
        window.open(fullImage.src || images[current].src, "_blank", "noopener");
        return;
      }
      busy = true;
      render();
      decodeFull()
        .then(function () {
          fromRect = printRect();
          toRect = viewerRect(fromRect);
          Object.assign(frame.style, toStyle(fromRect));
          document.documentElement.classList.add("portrait-viewer-open");
          viewer.showModal();
          viewer.classList.add("is-transitioning");
          return animateFrame(fromRect, toRect);
        })
        .then(function () {
          closeBtn.focus();
        })
        .finally(function () {
          viewer.classList.remove("is-transitioning");
          busy = false;
        });
    }

    function close() {
      if (!viewer.open || busy) return;
      busy = true;
      viewer.classList.add("is-closing", "is-transitioning");
      fromRect = printRect();
      animateFrame(toRect, fromRect)
        .then(function () {
          viewer.close();
        })
        .finally(function () {
          viewer.classList.remove("is-closing", "is-transitioning");
          document.documentElement.classList.remove("portrait-viewer-open");
          busy = false;
          if (expand) expand.focus({ preventScroll: true });
        });
    }

    function onArrow(delta) {
      return function (e) {
        e.stopPropagation();
        step(delta);
      };
    }
    if (prev) prev.addEventListener("click", onArrow(-1));
    if (next) next.addEventListener("click", onArrow(1));
    if (viewerPrev) viewerPrev.addEventListener("click", onArrow(-1));
    if (viewerNext) viewerNext.addEventListener("click", onArrow(1));
    if (expand)
      expand.addEventListener("click", function (e) {
        e.stopPropagation();
        open();
      });
    stack.addEventListener("click", open);
    stack.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    closeBtn.addEventListener("click", close);
    viewer.addEventListener("cancel", function (e) {
      e.preventDefault();
      close();
    });
    viewer.addEventListener("click", function (e) {
      if (e.target === viewer) close();
    });
    viewer.addEventListener("close", function () {
      document.documentElement.classList.remove("portrait-viewer-open");
    });
    document.addEventListener("keydown", function (e) {
      if (!viewer.open) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      }
    });
    window.addEventListener("resize", function () {
      if (viewer.open && !busy) relayout();
    });

    // Horizontal swipe on the stack cycles photos on touch screens.
    var touchX = null;
    stack.addEventListener(
      "touchstart",
      function (e) {
        touchX = e.touches.length === 1 ? e.touches[0].clientX : null;
      },
      { passive: true }
    );
    stack.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) {
        e.preventDefault();
        step(dx < 0 ? 1 : -1);
      }
    });

    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
