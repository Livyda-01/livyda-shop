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

/* LIVYDA — Länder-Flagge als Emoji vor dem Ländernamen */
(function () {
  function isoToFlag(code) {
    return code.toUpperCase().replace(/./g, function (c) {
      return String.fromCodePoint(127397 + c.charCodeAt(0));
    });
  }

  document.querySelectorAll('.localization-country-name[data-country-code]').forEach(function (el) {
    var code = el.dataset.countryCode;
    if (code) {
      el.textContent = isoToFlag(code) + '\u00A0' + el.textContent;
    }
  });
}());

/* LIVYDA — Scroll Reveal für Sektionen */
(function () {
  if (!('IntersectionObserver' in window)) return;

  var sections = document.querySelectorAll('.shopify-section');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('lv-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(function (el) { observer.observe(el); });
}());
