/* LIVYDA — Transparent Header über Hero */
(function () {
  var body = document.body;
  var isHome = body.classList.contains('template-index');
  if (!isHome) return;

  body.classList.add('lv-header-transparent');

  var ticking = false;
  var threshold = 60;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > threshold) {
          body.classList.add('lv-scrolled');
        } else {
          body.classList.remove('lv-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());
