(function () {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const meta = document.querySelector('meta[name="theme-color"]');
  function sync() {
    const dark = root.dataset.theme !== 'light';
    button.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    button.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    button.querySelector('[aria-hidden]').textContent = dark ? '☼' : '◐';
    meta.content = dark ? '#141c18' : '#f6f7f2';
  }
  button.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch (e) {}
    sync();
  });
  sync();
})();
