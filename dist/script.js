'use strict';
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intro = document.querySelector('.intro');
  const gs = window.gsap;
  let introTimeline;
  let introTimer;
  const finishIntro = () => {
    introTimeline?.kill();
    clearTimeout(introTimer);
    const heldFocus = intro.contains(document.activeElement);
    intro.hidden = true;
    if (heldFocus) document.querySelector('.brand').focus({preventScroll:true});
  };
  if (gs && !motion.matches && !location.hash) {
    intro.hidden = false;
    // Inspired by GreenSock's YzbPYMx: perspective + image scale/z,
    // paired with a hero zoom. Entry is timed so scrolling is never trapped.
    introTimeline = gs.timeline({onComplete:finishIntro})
      .from('.intro-logo',{scale:.65,rotation:-12,opacity:0,duration:.8,ease:'power3.out'})
      .from('.intro-center p',{y:25,opacity:0,duration:.5},.25)
      .to('.intro-logo',{scale:2,z:350,opacity:0,duration:1.25,ease:'power1.inOut'},1.2)
      .to('.intro-center p, .intro-center .eyebrow',{opacity:0,duration:.35},1.3)
      .to(intro,{opacity:0,duration:.7},1.9);
    introTimer=setTimeout(finishIntro,4500);
  }
  document.querySelector('.intro-skip').addEventListener('click',finishIntro);
  document.addEventListener('keydown',e=>{if(e.key==='Escape') finishIntro();});
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  const closeMenu=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');nav.classList.remove('open');};
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open);});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  window.matchMedia('(min-width: 601px)').addEventListener('change',closeMenu);
  motion.addEventListener('change',()=>{if(motion.matches) finishIntro();});
  // Load YouTube only after the visitor explicitly requests playback.
  const play=document.querySelector('.video-launch');
  play?.addEventListener('click',()=>{
    const frame=document.createElement('iframe');
    frame.src='https://www.youtube-nocookie.com/embed/utJEiOUFqlc?autoplay=1&rel=0';
    frame.title='Smart Campo — vídeo demonstrativo do projeto';
    frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen=true;
    frame.referrerPolicy='strict-origin-when-cross-origin';
    play.replaceWith(frame);
    const hint=document.createElement('p');
    hint.className='player-help';
    hint.textContent='Se o vídeo estiver indisponível no player, use “Assistir no YouTube” abaixo.';
    document.querySelector('.video-shell').after(hint);
    frame.focus();
  });
  if(gs && window.ScrollTrigger){
    gs.registerPlugin(ScrollTrigger);
    document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',()=>ScrollTrigger.refresh()));
    gs.to('.scroll-progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:0,end:'max',scrub:true}});
    gs.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
      gs.to('.field-image',{scale:1.12,yPercent:5,ease:'none',scrollTrigger:{trigger:'.hero-image',start:'top 80%',end:'bottom top',scrub:1}});
      gs.from('.hero h1>span',{y:45,opacity:0,duration:1,stagger:.13,delay:location.hash?0:2,ease:'power3.out'});
      const originals=[];
      document.querySelectorAll('h2.reveal').forEach(heading=>{
        originals.push([heading,heading.innerHTML]);
        const label=heading.innerText;
        const nodes=[];
        const walk=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
        while(walk.nextNode())nodes.push(walk.currentNode);
        nodes.forEach(node=>{
          const fragment=document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(word=>{
            if(/^\s+$/.test(word)){fragment.append(document.createTextNode(word));return;}
            const wrap=document.createElement('span');wrap.className='word';
            for(const letter of word){const char=document.createElement('span');char.className='char';char.textContent=letter;wrap.append(char);}
            fragment.append(wrap);
          });
          node.replaceWith(fragment);
        });
        heading.setAttribute('aria-label',label);
        [...heading.children].forEach(el=>el.setAttribute('aria-hidden','true'));
        gs.from(heading.querySelectorAll('.char'),{y:24,opacity:.08,stagger:.009,duration:.7,ease:'power3.out',scrollTrigger:{trigger:heading,start:'top 88%',once:true}});
      });
      gs.utils.toArray('.step').forEach(el=>gs.from(el,{y:26,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
      gs.to('.scan-line',{y:()=>document.querySelector('.scan-frame').clientHeight,ease:'none',scrollTrigger:{trigger:'.analysis-photo',start:'top 80%',end:'bottom 20%',scrub:1,invalidateOnRefresh:true}});
      gs.from('.bar',{scaleX:0,duration:1.4,stagger:.15,ease:'power3.out',scrollTrigger:{trigger:'.revenue',start:'top 85%',once:true}});
      const counters=[];
      document.querySelectorAll('[data-count]').forEach(el=>{
        const original=el.textContent;
        const visual=document.createElement('span');visual.setAttribute('aria-hidden','true');visual.textContent=original;
        const accessible=document.createElement('span');accessible.className='sr-only';accessible.textContent=original;
        el.replaceChildren(visual,accessible);
        counters.push([el,original]);
        const value={current:0};
        const digits=Number(el.dataset.decimals||0);
        const format=new Intl.NumberFormat('pt-BR',{minimumFractionDigits:digits,maximumFractionDigits:digits});
        gs.to(value,{current:Number(el.dataset.count),duration:2,ease:'power2.out',onUpdate:()=>{visual.textContent=format.format(value.current);},scrollTrigger:{trigger:el,start:'top 95%',once:true}});
      });
      return()=>{originals.forEach(([el,html])=>{el.innerHTML=html;el.removeAttribute('aria-label');});counters.forEach(([el,text])=>{el.textContent=text;});};
    });
    gs.matchMedia().add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
      const cursor=document.querySelector('.cursor');
      const x=gs.quickTo(cursor,'x',{duration:.25,ease:'power3.out'});
      const y=gs.quickTo(cursor,'y',{duration:.25,ease:'power3.out'});
      const move=e=>{const active=!!e.target.closest('a,button,summary');cursor.classList.toggle('active',active);cursor.style.opacity='1';x(e.clientX-(active?22:6));y(e.clientY-(active?22:6));};
      const leave=()=>{cursor.style.opacity='0';};
      window.addEventListener('pointermove',move,{passive:true});
      document.addEventListener('pointerleave',leave);
      return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);cursor.style.opacity='0';};
    });
    document.fonts.ready.then(()=>ScrollTrigger.refresh());
  }
})();
