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
