/* Small, event-driven spring. No work runs once the card is at rest. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const portrait = document.querySelector('.hero-portrait');
  let frame = 0, rect, previous = 0;
  let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0;
  function reset() {
    cancelAnimationFrame(frame); frame = 0; previous = 0;
    x = y = vx = vy = tx = ty = 0;
    if (portrait) {
      portrait.classList.remove('is-handled');
      ['--tilt-x','--tilt-y','--light-x','--light-y'].forEach(p => portrait.style.removeProperty(p));
    }
  }
  function tick(time) {
    const dt = Math.min((time - previous) / 16.67 || 1, 2); previous = time;
    vx = (vx + (tx - x) * .11 * dt) * Math.pow(.72, dt);
    vy = (vy + (ty - y) * .11 * dt) * Math.pow(.72, dt);
    x += vx * dt; y += vy * dt;
    portrait.style.setProperty('--tilt-x', (-y * 3.5).toFixed(3) + 'deg');
    portrait.style.setProperty('--tilt-y', (x * 4.5).toFixed(3) + 'deg');
    portrait.style.setProperty('--light-x', (50 + x * 42).toFixed(2) + '%');
    portrait.style.setProperty('--light-y', (50 + y * 42).toFixed(2) + '%');
    if (Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(vx)+Math.abs(vy) > .001) frame = requestAnimationFrame(tick);
    else { frame = 0; previous = 0; }
  }
  function start() { if (!frame) { previous = 0; frame = requestAnimationFrame(tick); } }
  if (portrait) {
    portrait.addEventListener('pointerenter', event => {
      if (reduced.matches || !fine.matches || event.pointerType === 'touch') return;
      rect = portrait.getBoundingClientRect(); portrait.classList.add('is-handled');
    });
    portrait.addEventListener('pointermove', event => {
      if (!portrait.classList.contains('is-handled') || reduced.matches || !fine.matches) return;
      tx = Math.max(-1, Math.min(1, (event.clientX-rect.left)/rect.width*2-1));
      ty = Math.max(-1, Math.min(1, (event.clientY-rect.top)/rect.height*2-1)); start();
    });
    portrait.addEventListener('pointerleave', () => { portrait.classList.remove('is-handled'); tx=ty=0; if (!reduced.matches) start(); });
    portrait.addEventListener('pointercancel', reset);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  reduced.addEventListener('change', reset); fine.addEventListener('change', reset);

  // A short flock splits along the two existing paths; replay on interaction.
  const mark = document.querySelector('.trajectory-mark');
  if (!mark || !Element.prototype.animate) return;
  const paths = mark.querySelectorAll('g path');
  const travelers = mark.querySelectorAll('.trajectory-traveler');
  let animations = [];
  function travel() {
    if (reduced.matches) return;
    animations.forEach(a => a.cancel());
    animations = [...travelers].map((dot, i) => {
      const path = paths[i % 2], length = path.getTotalLength();
      const frames = Array.from({length: 33}, (_, j) => {
        const p = path.getPointAtLength(length*j/32);
        return {transform: `translate(${p.x}px,${p.y}px)`, opacity:j===0||j===32?0:1, offset:j/32};
      });
      return dot.animate(frames, {duration:1500,delay:i*140,easing:'cubic-bezier(.3,0,.2,1)'});
    });
  }
  const wordmark = mark.closest('.wordmark');
  wordmark.addEventListener('pointerenter', travel);
  wordmark.addEventListener('focus', travel);
  reduced.addEventListener('change', () => { if (reduced.matches) animations.forEach(a => a.cancel()); });
  travel();
})();
