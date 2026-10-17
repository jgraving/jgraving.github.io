/* Natural-height masonry preserves document order and keyboard navigation. */
(() => {
 const grids=[...document.querySelectorAll('.research-masonry')];
 const desktop=matchMedia('(min-width:641px)');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let frame=0;
 function layout(){
  frame=0;
  grids.forEach(grid=>{
   grid.classList.toggle('is-masonry',desktop.matches);
   [...grid.children].forEach(card=>{
    if(desktop.matches)card.style.gridRowEnd='span '+Math.ceil(card.offsetHeight+28);
    else card.style.removeProperty('grid-row-end');
   });
  });
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(layout);}
 if('ResizeObserver' in window){
  const observer=new ResizeObserver(schedule);
  grids.forEach(grid=>[...grid.children].forEach(card=>observer.observe(card)));
  desktop.addEventListener('change',schedule);
  addEventListener('resize',schedule,{passive:true});
  document.fonts?.ready.then(schedule);
  schedule();
 }
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 grids.forEach(grid=>{
  grid.addEventListener('pointermove',event=>{
   if(reduced.matches||!fine.matches)return;
   const card=event.target.closest('.project,.current-project');
   if(!card)return;
   const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width,y=(event.clientY-r.top)/r.height;
   card.style.setProperty('--card-rx',((.5-y)*2)+'deg');
   card.style.setProperty('--card-ry',((x-.5)*2)+'deg');
   card.style.setProperty('--card-x',(x*100)+'%');
   card.style.setProperty('--card-y',(y*100)+'%');
  },{passive:true});
  grid.addEventListener('pointerleave',()=>grid.querySelectorAll('.project,.current-project').forEach(card=>{
   card.style.setProperty('--card-rx','0deg');card.style.setProperty('--card-ry','0deg');
  }));
 });

 // A brief physical unfold on entry; native layout and reading order remain intact.
 if('IntersectionObserver' in window&&Element.prototype.animate){
  const played=new Set(),active=new Map();
  const arrival=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    const card=entry.target;
    if(!entry.isIntersecting||played.has(card))return;
    played.add(card);arrival.unobserve(card);
    if(reduced.matches)return;
    const grid=card.parentElement,index=[...grid.children].indexOf(card);
    const b=card.getBoundingClientRect(),g=grid.getBoundingClientRect();
    const fromX=desktop.matches?(g.left+g.width/2-(b.left+b.width/2))*.65:0;
    const rotation=desktop.matches?(index%2===0?-7:7):(index%2===0?-3:3);
    const animation=card.animate([
     {transform:`perspective(1400px) translate(${fromX}px,90px) rotateX(14deg) rotateZ(${rotation}deg) scale(.9)`,opacity:.45,boxShadow:'0 30px 60px #0004',offset:0},
     {transform:'perspective(1400px) translate(0,-5px) rotateX(0) rotateZ(0) scale(1.008)',opacity:1,offset:.78},
     {transform:'none',opacity:1}
    ],{duration:920,delay:(index%2)*90,easing:'cubic-bezier(.16,1,.3,1)'});
    active.set(card,animation);
    animation.finished.catch(()=>{}).finally(()=>active.delete(card));
   });
  },{threshold:.1});
  grids.forEach(grid=>[...grid.children].forEach(card=>arrival.observe(card)));
  document.addEventListener('click',event=>{
   const link=event.target.closest('a[href]');
   if(!link||link.hash!=='#work'||reduced.matches)return;
   grids.forEach(grid=>[...grid.children].slice(0,2).forEach(card=>{
    active.get(card)?.cancel();played.delete(card);arrival.observe(card);
   }));
  });
  reduced.addEventListener('change',()=>{if(reduced.matches)active.forEach(animation=>animation.cancel());});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)active.forEach(animation=>animation.finish());});
 }
})();
