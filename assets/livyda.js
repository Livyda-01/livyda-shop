/* LIVYDA — minimal JS */
(function () {
  'use strict';

  /* -- Newsletter popup ------------------------------------ */
  var COOKIE = 'lv_nl';

  function getCookie(n) {
    return document.cookie.split(';').some(function (c) {
      return c.trim().startsWith(n + '=');
    });
  }

  function setCookie(n, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = n + '=1;expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function initPopup() {
    var overlay = document.getElementById('lv-nl');
    if (!overlay) return;

    if (getCookie(COOKIE)) return;

    setTimeout(function () {
      overlay.classList.add('is-open');
    }, 2200);

    function close(days) {
      setCookie(COOKIE, days || 30);
      overlay.classList.remove('is-open');
    }

    var btnX = document.getElementById('lv-nl-x');
    var btnSkip = document.getElementById('lv-nl-skip');
    var form = document.getElementById('lv-nl-form');

    if (btnX) btnX.addEventListener('click', function () { close(30); });
    if (btnSkip) btnSkip.addEventListener('click', function () { close(7); });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close(1);
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.querySelector('input').value;
        if (!email) return;
        close(365);
        form.innerHTML = '<p style="font-family:var(--lv-sans);font-size:12px;color:var(--lv-soft);text-align:center;padding:16px 0">Thank you — your 10% code is on its way.</p>';
      });
    }
  }

  /* -- Scroll reveal --------------------------------------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.lv-in,.lv-stagger').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.lv-in,.lv-stagger').forEach(function (el) {
      io.observe(el);
    });
  }

  /* -- Init ------------------------------------------------ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initPopup();
      initReveal();
    });
  } else {
    initPopup();
    initReveal();
  }
}());
