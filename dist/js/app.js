'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#mobile-nav');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'メニューを開く'); navigation.hidden = true; }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く'); navigation.hidden = !open; });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !navigation.hidden) { closeMenu(); menu.focus(); } });

// Set this to the production HTTPS booking/form URL before accepting applications.
const CONSULTATION_URL = '';
const dialog = document.querySelector('#consultation-dialog');
const opener = document.querySelector('#open-consultation');
let selectedPlan = '';
let previousFocus;
document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => { selectedPlan = link.dataset.plan; }));
opener.addEventListener('click', () => {
  previousFocus = document.activeElement;
  document.querySelector('#selected-plan').textContent = selectedPlan ? `ご検討中のプラン：${selectedPlan}` : '';
  const bookingLink = document.querySelector('#consultation-link');
  let validURL = false;
  try { validURL = new URL(CONSULTATION_URL).protocol === 'https:'; } catch { /* No booking URL configured yet. */ }
  document.querySelector('#consultation-pending').hidden = validURL;
  bookingLink.hidden = !validURL;
  if (validURL) bookingLink.href = CONSULTATION_URL;
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => previousFocus?.focus());
window.matchMedia('(min-width:901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Embedded PDF keeps the landing page portable as a single HTML file.
const GUIDE_PDF_URL = "./images/machi-josys-guide.pdf";
document.querySelectorAll("[data-guide-download]").forEach(link => { link.href = GUIDE_PDF_URL; });

(()=>{const canvas=document.getElementById("neural-network");if(!canvas)return;const ctx=canvas.getContext("2d");let nodes=[],forms=[],frame;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;const makeForm=(w,h)=>{const sides=3+Math.floor(Math.random()*4);return{cx:Math.random()*w,cy:Math.random()*h,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,angle:Math.random()*Math.PI*2,spin:(Math.random()-.5)*.006,sides,radii:Array.from({length:sides},()=>20+Math.random()*34),spread:Array.from({length:sides},()=>18+Math.random()*50),phase:Math.random(),speed:.0012+Math.random()*.0012}};const setup=()=>{const rect=canvas.getBoundingClientRect(),scale=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(rect.width*scale));canvas.height=Math.max(1,Math.round(rect.height*scale));ctx.setTransform(scale,0,0,scale,0,0);const count=rect.width<768?20:42;nodes=Array.from({length:count},()=>({x:Math.random()*rect.width,y:Math.random()*rect.height,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.4+.8}));forms=Array.from({length:rect.width<768?4:9},()=>makeForm(rect.width,rect.height));draw(rect.width,rect.height)};const formPoints=f=>{const scatter=Math.max(0,(f.phase-.48)/.52),build=Math.min(1,f.phase/.18);return f.radii.map((radius,i)=>{const a=f.angle+(Math.PI*2/f.sides)*i;const d=radius*(.55+.45*build)+f.spread[i]*scatter;return{x:f.cx+Math.cos(a)*d,y:f.cy+Math.sin(a)*d}})};const draw=(w=canvas.clientWidth,h=canvas.clientHeight)=>{ctx.clearRect(0,0,w,h);for(let i=0;i<nodes.length;i++){const a=nodes[i];for(let j=i+1;j<nodes.length;j++){const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy),limit=155;if(d<limit){ctx.strokeStyle="rgba(30,58,138,"+((1-d/limit)*.21)+")";ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}}forms.forEach(f=>{const points=formPoints(f),scatter=Math.max(0,(f.phase-.48)/.52),alpha=Math.sin(Math.min(f.phase,.98)*Math.PI)*.32;ctx.strokeStyle="rgba(2,132,199,"+(alpha*(1-scatter))+")";ctx.lineWidth=.9;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.stroke();points.forEach(p=>{ctx.fillStyle="rgba(245,158,11,"+(alpha*.8)+")";ctx.beginPath();ctx.arc(p.x,p.y,1.45,0,Math.PI*2);ctx.fill()})});nodes.forEach((n,i)=>{ctx.fillStyle=i%9===0?"rgba(245,158,11,.52)":"rgba(30,58,138,.48)";ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill()})};const animate=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<-8||n.x>w+8)n.vx*=-1;if(n.y<-8||n.y>h+8)n.vy*=-1});forms.forEach(f=>{f.cx+=f.vx;f.cy+=f.vy;f.angle+=f.spin;f.phase+=f.speed;if(f.phase>1){Object.assign(f,makeForm(w,h))}if(f.cx<-80||f.cx>w+80)f.vx*=-1;if(f.cy<-80||f.cy>h+80)f.vy*=-1});draw(w,h);frame=requestAnimationFrame(animate)};setup();if(!reduced)frame=requestAnimationFrame(animate);window.addEventListener("resize",setup,{passive:true});window.addEventListener("pagehide",()=>cancelAnimationFrame(frame),{once:true})})();

(()=>{const image=document.getElementById("hero-slideshow-image"),nextImage=document.getElementById("hero-slideshow-next");if(!image||!nextImage)return;const slides=[image.currentSrc,"./images/machi-josys-hands-on-support-photo-2.png","./images/machi-josys-hands-on-support-photo-3.png","./images/machi-josys-hands-on-support-photo-4.png"];const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");let index=0,changing=false;function showNext(){if(changing)return;const nextIndex=(index+1)%slides.length,nextSource=slides[nextIndex];if(reduce.matches){image.src=nextSource;index=nextIndex;return}changing=true;let completed=false;const finish=()=>{if(completed)return;completed=true;requestAnimationFrame(()=>{nextImage.classList.add("is-visible");window.setTimeout(()=>{image.src=nextSource;nextImage.style.transition="none";nextImage.classList.remove("is-visible");void nextImage.offsetWidth;nextImage.style.removeProperty("transition");index=nextIndex;changing=false},1100)})};nextImage.onload=finish;nextImage.onerror=()=>{image.src=nextSource;index=nextIndex;changing=false};nextImage.src=nextSource;if(nextImage.complete)finish()}window.setInterval(showNext,5000)})();

(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = [...document.querySelectorAll('main > .section:not(.hero)')];
  const reveal = section => {
    section.classList.add('is-revealed');
    section.querySelectorAll(':scope h2, :scope h3, :scope p, :scope figure, :scope li, :scope article, :scope a, :scope button').forEach((item, index) => {
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-delay', `${Math.min(index * 55, 440)}ms`);
    });
  };

  sections.forEach(section => section.classList.add('scroll-reveal'));
  if (reducedMotion || !('IntersectionObserver' in window)) {
    sections.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
  sections.forEach(section => observer.observe(section));
})();
