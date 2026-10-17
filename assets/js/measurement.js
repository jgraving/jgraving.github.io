(() => {
  const widget = document.querySelector('[data-measurement]');
  if (!widget) return;
  const canvas = widget.querySelector('canvas'), ctx = canvas.getContext('2d');
  if (!ctx) return;
  const video = widget.querySelector('video'), wipe = widget.querySelector('input');
  const play = widget.querySelector('.measurement-play'), status = widget.querySelector('.measurement-status');
  const buttons = [...widget.querySelectorAll('[data-species]')];
  let species = 'zebra', poster, loadId = 0, raf = 0, pending = false;
  const images = new Map();
  function draw() {
    const source = video.readyState >= 2 && video.dataset.species === species ? video : poster;
    if (!source) return;
    const size = canvas.width, split = size * Number(wipe.value)/100;
    // The source figure places footage in the upper-left panel and estimated pose in the lower-right.
    const width = source.videoWidth || source.naturalWidth;
    const height = source.videoHeight || source.naturalHeight;
    if (!width || !height) return;
    ctx.drawImage(source,0,0,width/2,height/2,0,0,size,size);
    ctx.save();ctx.beginPath();ctx.rect(split,0,size-split,size);ctx.clip();
    ctx.drawImage(source,width/2,height/2,width/2,height/2,0,0,size,size);ctx.restore();
  }
  function label() { play.innerHTML = video.paused ? 'Play sequence <span aria-hidden="true">▶</span>' : 'Pause sequence <span aria-hidden="true">Ⅱ</span>'; }
  function stop() { video.pause();cancelAnimationFrame(raf);raf=0;label(); }
  function frame() { draw(); if (!video.paused) raf=requestAnimationFrame(frame); }
  async function select(next) {
    stop(); species=next; pending=false; const id=++loadId;
    // Invalidate the previous movie before drawing the new still.
    video.removeAttribute('src');delete video.dataset.species;video.load();
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.species===next)));
    status.textContent='';
    let image=images.get(next);
    if (!image) { image=new Image();image.src=widget.dataset.images+next+'-measurement.webp';images.set(next,image); }
    try { await image.decode(); if(id!==loadId)return; poster=image;draw();canvas.hidden=false;widget.querySelector('.measurement-fallback').hidden=true;widget.classList.add('is-ready'); }
    catch(error){if(id===loadId)status.textContent='The comparison could not load.';}
  }
  wipe.addEventListener('input',()=>{widget.style.setProperty('--split',wipe.value+'%');wipe.setAttribute('aria-valuetext',(100-Number(wipe.value))+' percent estimated pose');draw();});
  buttons.forEach(button=>button.addEventListener('click',()=>select(button.dataset.species)));
  play.addEventListener('click',async()=>{
    if(pending){stop();pending=false;return;}
    if(!video.paused){stop();return;}
    const id=loadId;pending=true;status.textContent='Loading sequence…';
    if(video.dataset.species!==species){video.src=widget.dataset.base+species+'-measurement.mp4';video.dataset.species=species;}
    try{await video.play();if(id!==loadId)return;pending=false;status.textContent='';label();cancelAnimationFrame(raf);frame();}
    catch(error){if(id===loadId){pending=false;status.textContent='Playback unavailable. You can still drag the image.';label();}}
  });
  video.addEventListener('loadeddata',draw);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{if(event.matches)stop();});
  if('IntersectionObserver' in window){
    let initialized=false;
    new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!initialized){initialized=true;select(species);}else if(!e.isIntersecting)stop();});},{rootMargin:'100px'}).observe(widget);
  } else select(species);
})();
