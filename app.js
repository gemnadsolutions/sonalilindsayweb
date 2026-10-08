(() => {
  'use strict';
  const config = window.SONALI_CONFIG || {};
  const $ = s => document.querySelector(s);
  const menu = $('.menu-toggle'), nav = $('#nav');
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; nav.querySelectorAll('a').forEach(a => a.toggleAttribute('aria-current', a.hash === '#' + entry.target.id)); }), { rootMargin: '-15% 0px -65%' });
  ['home','about','music','videos','gallery','contact'].forEach(id => observer.observe(document.getElementById(id)));

  const livePlaylists = [
    { container: $('#release-grid'), playlist: config.featuredPlaylist, label: 'Featured release', prefix: 'release' },
    { container: $('#video-grid'), playlist: config.videosPlaylist, label: 'In the Spotlight', prefix: 'spotlight' }
  ];
  function renderLiveCards(item, videoIds) {
    item.container.replaceChildren();
    videoIds.slice(0, 4).forEach((videoId, index) => {
      const article = document.createElement('article'); article.className = 'media-card';
      const link = document.createElement('a'); link.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(videoId) + '&list=' + encodeURIComponent(item.playlist); link.target = '_blank'; link.rel = 'noopener'; link.setAttribute('aria-label', item.label + ' ' + (index + 1) + ' on YouTube');
      const image = document.createElement('div'); image.className = 'card-image';
      const img = document.createElement('img'); img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(videoId) + '/hqdefault.jpg'; img.alt = ''; img.width = 480; img.height = 360; img.loading = 'lazy';
      const play = document.createElement('span'); play.className = 'play-badge'; play.textContent = '▶'; play.setAttribute('aria-hidden', 'true');
      const title = document.createElement('h3'); title.textContent = item.label + ' ' + String(index + 1).padStart(2, '0');
      const meta = document.createElement('p'); meta.textContent = 'Sonali Lindsay · Watch on YouTube';
      image.append(img, play); link.append(image, title, meta); article.append(link); item.container.append(article);
    });
  }
  livePlaylists.forEach(item => {
    for (let index = 0; index < 4; index += 1) {
      const card = document.createElement('article'); card.className = 'media-card playlist-loading';
      card.innerHTML = '<div class="card-image" aria-hidden="true"></div><h3>Loading from YouTube…</h3><p>Live playlist</p>';
      item.container.append(card);
    }
    const probe = document.createElement('div'); probe.id = item.prefix + '-playlist-probe'; probe.className = 'playlist-probe'; probe.setAttribute('aria-hidden', 'true'); document.body.append(probe);
  });
  window.onYouTubeIframeAPIReady = () => {
    livePlaylists.forEach(item => {
      new window.YT.Player(item.prefix + '-playlist-probe', {
        width: '1', height: '1',
        playerVars: { listType: 'playlist', list: item.playlist, rel: 0, playsinline: 1 },
        events: {
          onReady: event => {
            let attempts = 0;
            const readPlaylist = () => {
              const videoIds = event.target.getPlaylist() || [];
              if (videoIds.length) { renderLiveCards(item, videoIds); return; }
              if (attempts++ === 0) event.target.cuePlaylist({ listType: 'playlist', list: item.playlist, index: 0 });
              if (attempts < 8) window.setTimeout(readPlaylist, 500);
            };
            readPlaylist();
          }
        }
      });
    });
  };
  const youtubeAPI = document.createElement('script');
  youtubeAPI.src = 'https://www.youtube.com/iframe_api';
  youtubeAPI.async = true;
  document.head.append(youtubeAPI);

  const audio = $('#preview-audio'), mute = $('#mute'), playPause = $('#play-pause'), status = $('#audio-status'), progress = $('.progress');
  const covers = ['hero','about','band','hero','about']; let track = 0, started = false, pending = false, muted = false;
  audio.volume = .35;
  function clock(seconds) { seconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0; return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2,'0'); }
  async function play() { if (pending || document.hidden) return; pending = true; try { await audio.play(); started = true; status.textContent = 'Track ' + (track + 1) + ' is playing.'; } catch (error) { if (error.name === 'NotAllowedError') status.textContent = 'Music starts after your first interaction.'; } finally { pending = false; } }
  function load(index) { track = index % 5; audio.src = 'assets/track-' + (track + 1) + '.mp3'; audio.load(); $('#track-title').textContent = 'Track ' + (track + 1); $('#track-count').textContent = String(track + 1).padStart(2,'0') + ' / 05'; $('#track-art').src = 'assets/' + covers[track] + '.webp'; document.querySelectorAll('.track-list li').forEach((li,i) => li.classList.toggle('active', i === track)); progress.firstElementChild.style.width = '0%'; play(); }
  audio.addEventListener('playing', () => { document.body.classList.add('is-playing'); playPause.textContent = 'Ⅱ'; playPause.setAttribute('aria-label', 'Pause music preview'); playPause.setAttribute('aria-pressed', 'true'); });
  audio.addEventListener('pause', () => { document.body.classList.remove('is-playing'); playPause.textContent = '▶'; playPause.setAttribute('aria-label', 'Play music preview'); playPause.setAttribute('aria-pressed', 'false'); });
  audio.addEventListener('ended', () => load(track + 1));
  audio.addEventListener('loadedmetadata', () => $('#duration').textContent = clock(audio.duration));
  audio.addEventListener('timeupdate', () => { const pct = audio.duration ? audio.currentTime / audio.duration * 100 : 0; progress.firstElementChild.style.width = pct + '%'; progress.setAttribute('aria-valuenow', String(Math.round(pct))); $('#elapsed').textContent = clock(audio.currentTime); });
  audio.addEventListener('error', () => { status.textContent = 'This preview is unavailable. Listen on Spotify instead.'; });
  function firstInteraction(e) { if (started || e.target.closest('input,textarea,select,#mute,#play-pause,iframe')) return; if (e.type === 'keydown' && ['Shift','Control','Alt','Meta','Escape'].includes(e.key)) return; play(); }
  document.addEventListener('pointerdown', firstInteraction); document.addEventListener('keydown', firstInteraction);
  playPause.addEventListener('click', () => { if (audio.paused) play(); else audio.pause(); });
  mute.addEventListener('click', () => { muted = !muted; audio.muted = muted; mute.textContent = muted ? 'Sound off' : 'Sound on'; mute.setAttribute('aria-pressed',String(muted)); if (!started) play(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) audio.pause(); }); play();

  const descriptions = ['Portrait of Sonali in black','Sonali beside a microphone','Musicians in an archive photograph','A group portrait from Sonali’s archive','An early portrait of Sonali','Sonali on a night out','Sonali holding a guitar','Musicians performing together'];
  const reel = $('#film-track'), group = document.createElement('div'); group.className = 'film-group';
  for (let i=1;i<=8;i++) { const figure=document.createElement('figure'),img=document.createElement('img'); img.src='assets/archive-'+i+'.webp';img.alt=descriptions[i-1];img.loading='eager';img.width=205;img.height=126;figure.append(img);group.append(figure); }
  reel.append(group); const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('img').forEach(img=>img.alt='');reel.append(clone);
  const reelButton=$('#reel-toggle'); if (matchMedia('(prefers-reduced-motion: reduce)').matches) { $('.reel').classList.add('paused'); reelButton.hidden=true; }
  reelButton.addEventListener('click',()=>{const paused=$('.reel').classList.toggle('paused');reelButton.setAttribute('aria-pressed',String(paused));reelButton.textContent=paused?'Resume reel →':'Pause reel Ⅱ';});

  const form=$('#booking-form'),formStatus=$('#form-status'),submit=$('#submit-enquiry'),download=$('#download-enquiry');let downloadURL;
  if(config.emailEndpoint){$('#contact-note').textContent='Share the details below and we’ll respond by email.';submit.firstChild.textContent='Send Enquiry ';}
  form.addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');download.hidden=true;formStatus.textContent='';});
  form.addEventListener('submit',async e=>{e.preventDefault();['name','message'].forEach(name=>{const input=form.elements[name],min=name==='message'?10:1;input.setCustomValidity(input.value.trim().length<min?(name==='message'?'Please enter at least 10 characters.':'Please enter your name.'):'');});if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));Object.keys(values).forEach(k=>values[k]=values[k].trim());
    if(!config.emailEndpoint){const text='SONALI LINDSAY — ENQUIRY DRAFT (NOT SENT)\n\n'+Object.entries(values).map(([k,v])=>k.charAt(0).toUpperCase()+k.slice(1)+': '+(v||'Not specified')).join('\n\n');if(downloadURL)URL.revokeObjectURL(downloadURL);downloadURL=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));download.href=downloadURL;download.hidden=false;formStatus.textContent='Your enquiry is ready to download. It has not been sent.';formStatus.focus();return;}
    submit.disabled=true;formStatus.textContent='Sending your enquiry…';try{const endpoint=new URL(config.emailEndpoint,location.href);if(endpoint.protocol!=='https:'&&endpoint.origin!==location.origin)throw new Error('Invalid endpoint');const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values),signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error('Delivery failed');formStatus.textContent='Thank you. Your enquiry has been submitted.';form.reset();}catch(_){formStatus.textContent='Your enquiry could not be sent. Please try again later.';}finally{submit.disabled=false;formStatus.focus();}
  });
})();
