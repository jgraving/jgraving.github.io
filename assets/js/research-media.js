// Media is fetched only after a visitor chooses to play it.
document.addEventListener('click', function (event) {
  const link = event.target.closest('.research-film');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  let player;
  if (link.dataset.youtube) {
    player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(link.dataset.youtube) + '?autoplay=1&mute=1&playsinline=1&rel=0';
    player.title = link.dataset.title + ' — research film';
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
  } else {
    player = document.createElement('video');
    player.muted = true;
    player.src = link.dataset.video;
    player.controls = true;
    player.autoplay = true;
    player.playsInline = true;
    player.setAttribute('aria-label', link.dataset.title + ' — research film');
  }
  player.tabIndex = 0;
  link.replaceWith(player);
  player.focus();
  if (player instanceof HTMLVideoElement) {
    const playback = player.play();
    if (playback) playback.catch(function () { /* Native controls remain available if playback is blocked. */ });
  }
});
