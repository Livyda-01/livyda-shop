/* ============================================================
   LIVYDA — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- NEWSLETTER POPUP ---------------------------------- */
  const overlay = document.getElementById('lv-popup-overlay');
  if (overlay) {
    const COOKIE_KEY = 'lv_newsletter_shown';

    function setCookie(name, days) {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=true;expires=' + d.toUTCString() + ';path=/';
    }

    function getCookie(name) {
      return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
    }

    function closePopup() {
      overlay.classList.remove('is-visible');
    }

    if (!getCookie(COOKIE_KEY)) {
      setTimeout(() => overlay.classList.add('is-visible'), 2000);
    }

    // Close on X button
    const closeBtn = document.getElementById('lv-popup-close');
    if (closeBtn) closeBtn.addEventListener('click', () => {
      setCookie(COOKIE_KEY, 30);
      closePopup();
    });

    // Close on skip
    const skipBtn = document.getElementById('lv-popup-skip');
    if (skipBtn) skipBtn.addEventListener('click', () => {
      setCookie(COOKIE_KEY, 7);
      closePopup();
    });

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        setCookie(COOKIE_KEY, 1);
        closePopup();
      }
    });

    // Form submit
    const form = document.getElementById('lv-popup-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        if (email) {
          setCookie(COOKIE_KEY, 365);
          // Show success state
          form.innerHTML = '<p style="font-family:var(--lv-body);font-size:12px;font-weight:300;letter-spacing:0.06em;color:var(--lv-text-soft);text-align:center;padding:20px 0;">Thank you. Your 10% discount has been sent.</p>';
          setTimeout(closePopup, 2500);
        }
      });
    }
  }

  /* ---- SCROLL REVEAL ------------------------------------- */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.lv-reveal, .lv-reveal-stagger');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    document.querySelectorAll('.lv-reveal, .lv-reveal-stagger').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ---- HEADER SCROLL BEHAVIOR ---------------------------- */
  const header = document.querySelector('.section-header');
  if (header) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 80) {
        header.style.boxShadow = '0 1px 0 rgba(10,10,10,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastY = y;
    }, { passive: true });
  }

});
