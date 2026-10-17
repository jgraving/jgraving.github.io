/* Progressive enhancement: content and native controls work without JS. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.2,.8,.2,1)';
  const canAnimate = typeof Element.prototype.animate === 'function';
  const animate = (el, frames, options) => {
    if (!reduced.matches && canAnimate) return el.animate(frames, options);
    return null;
  };
  reduced.addEventListener('change', () => {
    if (reduced.matches && document.getAnimations) document.getAnimations().forEach(a => a.finish());
  });

  // A single observer handles arrival; nothing is hidden while waiting for JS.
  if ('IntersectionObserver' in window) {
    const arrivals = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        arrivals.unobserve(target);
        animate(target, [{opacity: .35, transform: 'translateY(22px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 620, easing: ease});
      });
    }, {threshold: .08});
    document.querySelectorAll('.hero-copy,.hero-portrait,.about-grid,.section-heading,.contact-section').forEach(el => arrivals.observe(el));

    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (header && hero) {
      new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting), {threshold: 0}).observe(hero);
    }
    const sections = [...document.querySelectorAll('#about,#work,#current,#contact')];
    const links = [...document.querySelectorAll('.nav-links a')];
    const navigation = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting);
      if (!visible.length) return;
      const id = visible[visible.length - 1].target.id;
      links.forEach(link => {
        if (link.hash === '#' + (id === 'current' ? 'work' : id)) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-15% 0px -55% 0px', threshold: 0});
    sections.forEach(section => navigation.observe(section));
  }

  // Press feedback uses one delegated listener, and removes its temporary node.
  document.addEventListener('click', event => {
    const button = event.target.closest('.button,.theme-toggle');
    if (!button || reduced.matches || !canAnimate) return;
    const box = button.getBoundingClientRect();
    const size = Math.max(box.width, box.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'material-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    const x = event.detail ? event.clientX - box.left : box.width / 2;
    const y = event.detail ? event.clientY - box.top : box.height / 2;
    Object.assign(ripple.style, {width: size + 'px', height: size + 'px', left: x - size / 2 + 'px', top: y - size / 2 + 'px'});
    button.append(ripple);
    const animation = animate(ripple, [{transform:'scale(0)',opacity:.18},{transform:'scale(1)',opacity:0}], {duration:480,easing:ease});
    if (animation) animation.finished.finally(() => ripple.remove());
    else ripple.remove();
  });

  // Native details retain keyboard semantics. Animate only during interaction.
  document.querySelectorAll('.research-details').forEach(details => {
    const summary = details.querySelector('summary');
    let animation;
    let opening = false;
    summary.addEventListener('click', event => {
      if (reduced.matches || !canAnimate) return;
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      opening = animation ? !opening : !details.open;
      if (animation) animation.cancel();
      details.open = true;
      const end = opening ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
      details.style.overflow = 'hidden';
      animation = details.animate([{height:start + 'px'}, {height:end + 'px'}], {duration:340,easing:ease});
      animation.onfinish = () => {
        details.open = opening;
        details.style.overflow = '';
        animation = null;
      };
    });
  });
})();
