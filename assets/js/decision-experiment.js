import {simulate} from './decision-model.mjs';
const root = document.querySelector('.decision-experiment');
if (root) {
  const canvas = root.querySelector('canvas'), ctx = canvas.getContext('2d');
  const stage = root.querySelector('.decision-stage'), slider = root.querySelector('input');
  const run = root.querySelector('.decision-run'), status = root.querySelector('.decision-status');
  const buttons = [...root.querySelectorAll('.decision-target')];
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let targets = [{x:-.35,y:.13},{x:.35,y:.13}], paths, seed = 7, progress = 1, frame = 0, started = 0, width = 1, height = 1;
  const world = {left:.09, right:.91, top:.12, bottom:.88};
  const project = p => ({x:width * (.5 + p.x * (world.right-world.left)), y:height * (world.top + p.y * (world.bottom-world.top))});
  function positionButtons() { targets.forEach((p,i) => { const q=project(p); buttons[i].style.left=q.x+'px'; buttons[i].style.top=q.y+'px'; }); }
  function paint() {
    const style = getComputedStyle(root.querySelector('.decision-surface'));
    const a=style.getPropertyValue('--decision-a').trim(), b=style.getPropertyValue('--decision-b').trim();
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle=style.getPropertyValue('--muted').trim()||'#849187';
    ctx.globalAlpha=.15;
    for(let x=18;x<width;x+=28)for(let y=18;y<height;y+=28){ctx.beginPath();ctx.arc(x,y,.7,0,Math.PI*2);ctx.fill();}
    ctx.globalAlpha=1;
    paths.forEach((path,index)=>{
      const n=Math.max(1,Math.floor(progress*(path.points.length-1)));
      const color=path.choice===0?a:b;
      ctx.strokeStyle=color;ctx.lineWidth=index===0?2.4:1.15;ctx.globalAlpha=index===0?.95:.3;
      ctx.beginPath();path.points.slice(0,n+1).forEach((p,i)=>{const q=project(p);if(i)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);});ctx.stroke();
      if(progress<1){const q=project(path.points[n]);ctx.globalAlpha=index===0?1:.65;ctx.fillStyle=color;ctx.beginPath();ctx.arc(q.x,q.y,index===0?4:2.2,0,Math.PI*2);ctx.fill();}
    });
    ctx.globalAlpha=1;
    const p=project({x:0,y:.92});ctx.fillStyle=style.getPropertyValue('--ink').trim()||a;ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fill();
    positionButtons();
  }
  function stop() { cancelAnimationFrame(frame); frame=0; }
  function outcome() {
    const left=paths.filter(p=>p.choice===0).length,right=paths.filter(p=>p.choice===1).length;
    status.textContent=`${left} paths reached A; ${right} reached B. Move a destination or change the separation to try another geometry.`;
  }
  function reset() {stop();paths=simulate(targets,seed);progress=1;run.disabled=false;run.innerHTML='Run experiment <span aria-hidden="true">↗</span>';status.textContent='Each path is a repeat of the same experiment, with small internal fluctuations.';paint();}
  function tick(now) {
    if(!started)started=now;
    progress=Math.min(1,(now-started)/5200);paint();
    if(progress<1)frame=requestAnimationFrame(tick);else{frame=0;run.innerHTML='Run again <span aria-hidden="true">↗</span>';outcome();}
  }
  run.addEventListener('click',()=>{
    stop();seed+=31;paths=simulate(targets,seed);started=0;
    if(reduced.matches){progress=1;paint();outcome();run.innerHTML='Run again <span aria-hidden="true">↗</span>';return;}
    progress=0;status.textContent='Running 20 repeats. Watch where their paths begin to separate.';
    run.innerHTML='Run again <span aria-hidden="true">↗</span>';frame=requestAnimationFrame(tick);
  });
  slider.addEventListener('input',()=>{const x=Number(slider.value)/200;targets=[{x:-x,y:.13},{x,y:.13}];reset();});
  const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
  buttons.forEach((button,index)=>{
    let dragging=false;
    button.addEventListener('pointerdown',e=>{dragging=true;button.setPointerCapture(e.pointerId);stop();});
    button.addEventListener('pointermove',e=>{if(!dragging)return;const r=stage.getBoundingClientRect();targets[index]={x:clamp(((e.clientX-r.left)/r.width-.5)/(world.right-world.left),index===0?-.52:.08,index===0?-.08:.52),y:clamp(((e.clientY-r.top)/r.height-world.top)/(world.bottom-world.top),.04,.4)};reset();});
    const release=()=>{dragging=false;};button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);
    button.addEventListener('keydown',e=>{const d={ArrowLeft:[-.025,0],ArrowRight:[.025,0],ArrowUp:[0,-.025],ArrowDown:[0,.025]}[e.key];if(!d)return;e.preventDefault();targets[index]={x:clamp(targets[index].x+d[0],index===0?-.52:.08,index===0?-.08:.52),y:clamp(targets[index].y+d[1],.04,.4)};reset();});
  });
  function resize(){const r=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);paint();}
  paths=simulate(targets,seed);run.disabled=false;new ResizeObserver(resize).observe(stage);
  new MutationObserver(()=>paint()).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  function finish(){if(frame){stop();progress=1;paint();outcome();}}
  reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();});
  new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)finish();},{threshold:0}).observe(root);
}
