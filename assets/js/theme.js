(function () {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!button) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let transition;
  function sync() {
    const dark = root.dataset.theme !== 'light';
    button.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    button.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    button.querySelector('[aria-hidden]').textContent = dark ? '☼' : '◐';
    if (meta) meta.content = dark ? '#141c18' : '#f6f7f2';
  }
  function change() {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch (e) {}
    sync();
  }
  reduced.addEventListener('change', () => { if (reduced.matches && transition) transition.skipTransition(); });
  button.addEventListener('click', function () {
    if (transition) return;
    if (reduced.matches || !document.startViewTransition || !root.animate) { change(); return; }
    const box = button.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('theme-reveal');
    try {
      transition = document.startViewTransition(change);
      transition.ready.then(() => {
        if (reduced.matches) return;
        root.animate({clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]}, {
          duration: 620, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)'
        });
      }).catch(() => {});
      transition.finished.finally(() => { transition = null; root.classList.remove('theme-reveal'); });
    } catch (error) { transition = null; root.classList.remove('theme-reveal'); change(); }
  });
  sync();
})();
