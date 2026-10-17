// Two-target reduction of the consensus natural-gradient and action policies.
// State weights are softmax(z); delta = z_A - z_B. With A_ii = 0 and
// A_AB = kappa * (u_A dot u_B - baseline), (A p)_A - (A p)_B
// is -A_AB * tanh(delta/2). There is no extra leak or initial bias.
export const PARAMETERS = Object.freeze({
  kappa: 12, baseline: 0, stateStep: .06, movementStep: .003,
  epsilon: .001, arrivalRadius: .006, maxSteps: 2400,
});
export const stateDrift = (delta, dot, kappa = PARAMETERS.kappa, baseline = PARAMETERS.baseline) =>
  -kappa * (dot - baseline) * Math.tanh(delta / 2);
export const stateWeight = delta => delta >= 0
  ? 1 / (1 + Math.exp(-delta))
  : Math.exp(delta) / (1 + Math.exp(delta));

// noiseAmplitude is the per-step SD of the logit-difference perturbation.
// Gaussian increments implement the manuscript's optional zero-mean state noise;
// motor noise is set to zero to make the geometry easier to see.
export function simulate(targets, seed = 1, count = 20, noiseAmplitude = .025, options = {}) {
  if (!Array.isArray(targets) || targets.length !== 2 ||
      targets.some(p => !Number.isFinite(p.x) || !Number.isFinite(p.y))) {
    throw new TypeError('Expected two finite target positions');
  }
  const cfg = {...PARAMETERS, ...options};
  let s = seed >>> 0;
  const random = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return (s + .5) / 4294967296; };
  const gaussian = () => Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
  return Array.from({length: count}, (_, index) => {
    let x = 0, y = .92, delta = 0;
    const points = [{x, y, w: .5}];
    let choice = -1;
    for (let t = 0; t < cfg.maxSteps; t++) {
      const vectors = targets.map(c => {
        const dx = c.x - x, dy = c.y - y, d = Math.hypot(dx, dy);
        return {x: dx / Math.max(d, 1e-12), y: dy / Math.max(d, 1e-12), d};
      });
      const nearest = vectors[0].d <= vectors[1].d ? 0 : 1;
      if (vectors[nearest].d < cfg.arrivalRadius) {
        // Arrival is a stopping criterion, not a forced belief update or snap.
        choice = nearest; break;
      }
      const dot = Math.max(-1, Math.min(1, vectors[0].x * vectors[1].x + vectors[0].y * vectors[1].y));
      // State first, then action with the updated state weights (not the
      // distance-conditioned posterior, which is a distinct distribution).
      delta += cfg.stateStep * stateDrift(delta, dot, cfg.kappa, cfg.baseline) + noiseAmplitude * gaussian();
      const w = stateWeight(delta);
      const dx = w * vectors[0].x + (1 - w) * vectors[1].x;
      const dy = w * vectors[0].y + (1 - w) * vectors[1].y;
      const scale = cfg.movementStep / (Math.hypot(dx, dy) + cfg.epsilon);
      x += dx * scale; y += dy * scale;
      points.push({x, y, w});
    }
    return {points, choice, index};
  });
}
