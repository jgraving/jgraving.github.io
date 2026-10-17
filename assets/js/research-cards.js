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
    if(desktop.matches)card.style.gridRowEnd='span '+Math.ceil(card.getBoundingClientRect().height+28);
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
})();
