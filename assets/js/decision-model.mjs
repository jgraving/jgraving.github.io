// Illustrative two-option model, not a fit to animal data.
// z is an internal logit difference; w = sigmoid(z) weights target bearings.
// Angular competition amplifies z, while leak stabilizes equal weighting.
export const stateDrift = (z, dot) => 2 * (1 - dot) * Math.tanh(z / 2) - .65 * z;
export function simulate(targets, seed = 1, count = 20, noiseAmplitude = .025) {
  let s = seed >>> 0;
  const random = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  return Array.from({length: count}, (_, index) => {
    // Exactly equal initial weights: sigmoid(0) = 1/2. Only process noise breaks symmetry.
    let x = 0, y = .92, z = 0;
    const points = [{x, y, w: .5}];
    let choice = -1;
    for (let t = 0; t < 1000; t++) {
      const vectors = targets.map(c => { const dx = c.x - x, dy = c.y - y, d = Math.hypot(dx, dy); return {x: dx / Math.max(d, 1e-9), y: dy / Math.max(d, 1e-9), d}; });
      const near = vectors.findIndex(v => v.d < .018);
      if (near >= 0) { choice = near; points.push({...targets[near], w: near === 0 ? 1 : 0}); break; }
      const dot = Math.max(-1, Math.min(1, vectors[0].x * vectors[1].x + vectors[0].y * vectors[1].y));
      z += .06 * stateDrift(z, dot) + (random() - .5) * noiseAmplitude;
      z = Math.max(-12, Math.min(12, z));
      const w = 1 / (1 + Math.exp(-z));
      const dx = w * vectors[0].x + (1 - w) * vectors[1].x;
      const dy = w * vectors[0].y + (1 - w) * vectors[1].y;
      const norm = Math.hypot(dx, dy);
      // Slow naturally near an exact compromise instead of dividing by zero.
      const speed = .003 / Math.max(norm, .12);
      x += dx * speed; y += dy * speed;
      points.push({x, y, w});
    }
    return {points, choice, index};
  });
}
