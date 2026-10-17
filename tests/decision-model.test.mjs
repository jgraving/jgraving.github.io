import assert from 'node:assert/strict';
import {simulate, stateDrift} from '../assets/js/decision-model.mjs';
const symmetric = [{x:-.35,y:.13},{x:.35,y:.13}];
const quiet = simulate(symmetric,7,20,0);
assert(quiet.every(p=>p.points.every(q=>q.x===0 && q.w===.5)), 'Without noise, equal priors stay exactly symmetric');
assert(quiet.every(p=>p.choice===-1), 'A symmetric noise-free path must not arbitrarily choose a target');
for (const separation of [.2,.7,1]) {
 const targets=[{x:-separation/2,y:.13},{x:separation/2,y:.13}];
 const paths=simulate(targets,7);
 assert(paths.every(p=>p.points[0].w===.5), 'Every repeat starts 50/50');
 assert(paths.every(p=>p.choice>=0), 'Noisy trajectories reach a target');
 assert(paths.every(p=>p.points.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y)&&q.w>=0&&q.w<=1)));
 assert.deepEqual(paths,simulate(targets,7), 'Seeded results are reproducible');
 const mirrored=simulate(targets,7,20,-.025);
 paths.forEach((p,i)=>{assert.equal(p.choice,1-mirrored[i].choice);assert.equal(p.points.length,mirrored[i].points.length);p.points.forEach((q,j)=>{assert(Math.abs(q.x+mirrored[i].points[j].x)<1e-10);assert(Math.abs(q.y-mirrored[i].points[j].y)<1e-10);});});
}
assert.equal(stateDrift(0,-1),0);
assert(stateDrift(.001,1)<0 && stateDrift(.001,-1)>0);
console.log('PASS: equal priors; exact noise-free symmetry; reflected-noise symmetry; finite arrivals; repeatability; stability change.');


// Verify the scalar reduction against the full softmax natural-gradient update,
// independently computing A p for two logits across multiple geometries.
for (const delta of [-4, -.7, 0, .7, 4]) {
 for (const dot of [-1, -.3, 0, .4, 1]) {
  for (const baseline of [-.5, 0, .5]) {
   const kappa=7, w=Math.exp(delta)/(1+Math.exp(delta));
   const a=kappa*(dot-baseline);
   const ap=[a*(1-w), a*w];
   assert(Math.abs(stateDrift(delta,dot,kappa,baseline)-(ap[0]-ap[1]))<1e-12);
  }
 }
}
// The stability crossing is exactly the specified bearing threshold, not a leak
// or a function of separation in world coordinates.
for (const angle of [60,90,120]) {
 const b=Math.cos(angle*Math.PI/180);
 assert(Math.abs(stateDrift(.01,b,12,b))===0);
 assert(stateDrift(.01,b+.001,12,b)<0);
 assert(stateDrift(.01,b-.001,12,b)>0);
}
// A single update uses updated STATE weights and manuscript's norm + epsilon.
const targets=[{x:-.21,y:.1},{x:.49,y:.35}];
const [step]=simulate(targets,4,1,.025,{maxSteps:1});
const first=step.points[1];
const bearings=targets.map(c=>{const d=Math.hypot(c.x,c.y-.92);return {x:c.x/d,y:(c.y-.92)/d};});
const ux=first.w*bearings[0].x+(1-first.w)*bearings[1].x;
const uy=first.w*bearings[0].y+(1-first.w)*bearings[1].y;
assert(Math.abs(first.x-.003*ux/(Math.hypot(ux,uy)+.001))<1e-14);
assert(Math.abs(first.y-(.92+.003*uy/(Math.hypot(ux,uy)+.001)))<1e-14);
for (const ax of [-.52,-.08]) for (const bx of [.08,.52])
 for (const ay of [.04,.4]) for (const by of [.04,.4]) {
  const ps=simulate([{x:ax,y:ay},{x:bx,y:by}],7);
  assert(ps.every(p=>p.choice>=0),'All draggable corner geometries arrive');
  assert(ps.every(p=>p.points.every(q=>Number.isFinite(q.x)&&Number.isFinite(q.y))));
 }
assert.equal(simulate(symmetric,7,1,.025,{maxSteps:1})[0].choice,-1,'Time limit is not a forced choice');
console.log('PASS: full-matrix equivalence; configurable angular threshold; state-before-action update; draggable geometry extremes; honest unresolved outcomes.');
