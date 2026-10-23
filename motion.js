(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const showAll = () => {
    if (observer) observer.disconnect();
    document.querySelectorAll('.motion-reveal').forEach(el => el.classList.add('motion-seen'));
  };
  document.body.classList.add('motion-ready');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('motion-seen');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    const sections = document.querySelectorAll('main .secao');
    const blocks = sections.length ? sections : document.querySelectorAll('main .card');
    blocks.forEach(el => {
      if (!el.contains(document.activeElement) || document.activeElement === document.body) {
        el.classList.add('motion-reveal');
        observer.observe(el);
      }
    });
    document.addEventListener('focusin', event => {
      const block = event.target.closest('.motion-reveal');
      if (block) block.classList.add('motion-seen');
    });
  }
  reduced.addEventListener('change', event => { if (event.matches) showAll(); });
  const menuButton = document.getElementById('hamb');
  const menu = document.getElementById('mm');
  if (menuButton && menu) {
    menuButton.setAttribute('aria-controls', 'mm');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.onclick = () => {
      const open = menu.style.display !== 'block';
      menu.style.display = open ? 'block' : 'none';
      menu.classList.toggle('motion-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
    };
  }
})();
