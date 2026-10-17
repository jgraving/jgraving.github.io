/* Natural-height masonry preserves document order and keyboard navigation. */
(() => {
 const grids=[...document.querySelectorAll('.research-masonry')];
 const desktop=matchMedia('(min-width:641px)');
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
})();
