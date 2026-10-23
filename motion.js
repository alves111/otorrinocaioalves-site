(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.body.classList.add('motion-ready');
  let io;
  const showAll = () => { if (io) io.disconnect(); document.querySelectorAll('.m2-item').forEach(el => el.classList.add('m2-in')); };
  if (!reduced.matches && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      vis.forEach((e, i) => { e.target.style.transitionDelay = Math.min(i, 5) * 90 + 'ms'; e.target.classList.add('m2-in'); io.unobserve(e.target); });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('main .secao > h2, main .secao > .secao-sub, main .minicard, main .stat, main .card, main .depo, main .banda-in > h2, main .avalie-google').forEach(el => {
      if (el.contains(document.activeElement) && document.activeElement !== document.body) return;
      el.classList.add('m2-item'); io.observe(el);
    });
    // Protecao: depois de rolar/saltar, mostra tudo que ficou acima ou dentro da tela e nao disparou.
    let t;
    const sweep = () => document.querySelectorAll('.m2-item:not(.m2-in)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { el.style.transitionDelay = '0ms'; el.classList.add('m2-in'); io.unobserve(el); }
    });
    window.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(sweep, 160); }, { passive: true });
    window.addEventListener('hashchange', () => setTimeout(sweep, 160));
    document.addEventListener('focusin', e => { const b = e.target.closest('.m2-item'); if (b) b.classList.add('m2-in'); });
  }
  reduced.addEventListener('change', e => { if (e.matches) showAll(); });
  const btn = document.getElementById('hamb'), menu = document.getElementById('mm');
  if (btn && menu) {
    btn.setAttribute('aria-controls', 'mm'); btn.setAttribute('aria-expanded', 'false');
    btn.onclick = () => { const open = menu.style.display !== 'block'; menu.style.display = open ? 'block' : 'none'; menu.classList.toggle('motion-open', open); btn.setAttribute('aria-expanded', String(open)); };
  }
})();
