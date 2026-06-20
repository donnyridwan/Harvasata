// Harvasta — landing page behaviour. Kept tiny and idle-friendly for Lighthouse.
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav: solid background once scrolled ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scroll reveal ---- */
  document.body.classList.add('anim-on');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var t = e.target;
        io.unobserve(t);
        if (t.hasAttribute('data-stagger')) {
          var kids = t.querySelectorAll(':scope > [data-reveal]');
          kids.forEach(function (k, i) { setTimeout(function () { k.classList.add('in'); }, i * 90); });
        } else {
          t.classList.add('in');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-stagger]').forEach(function (s) { io.observe(s); });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (!el.closest('[data-stagger]')) io.observe(el);
    });
  } else {
    // No IO support (or reduced motion): show everything.
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Video play button (placeholder hook) ---- */
  var play = document.getElementById('play');
  if (play) {
    play.addEventListener('click', function () {
      play.setAttribute('aria-pressed', play.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      // Hook a real <video>/embed here when media is available.
    });
  }

  /* ---- Loader: animate the bar, then dismiss ---- */
  var loader = document.getElementById('loader');
  var fill = document.getElementById('loader-fill');
  var pct = document.getElementById('loader-pct');
  if (loader) {
    var done = false, intId = null, hideT = null;
    function hide() {
      if (done) return;
      done = true;
      if (intId) { clearInterval(intId); intId = null; }
      if (fill) fill.style.width = '100%';
      if (pct) pct.textContent = '100';
      loader.classList.add('done');
      hideT = setTimeout(function () { loader.style.display = 'none'; }, 650);
    }
    var dur = reduce ? 250 : 1400;
    var start = Date.now();
    intId = setInterval(function () {
      var t = Math.min(1, (Date.now() - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      var p = Math.round(eased * 100);
      if (fill) fill.style.width = p + '%';
      if (pct) pct.textContent = String(p).padStart(2, '0');
      if (t >= 1) hide();
    }, 60);
    setTimeout(hide, dur + 600); // safety net
  }
})();
