/* Norte: broad vertical chapters, solar tracing and an exploded spatial journey. */
import {gsap,startMotion} from './scroll-engine';
let introduced=false;

startMotion(()=>{
 if(!introduced){gsap.from('.hero h1>span',{yPercent:70,opacity:0,duration:1.1,stagger:.12,ease:'power3.out'});introduced=true;}
 gsap.fromTo('.hero-image img',{scale:1.04,yPercent:0},{scale:1.14,yPercent:7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.7}});
 gsap.to('.hero-copy',{y:-75,opacity:.28,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
 gsap.fromTo('.sun-marker',{rotation:-70,transformOrigin:'412px 300px'},{rotation:55,ease:'none',scrollTrigger:{trigger:'.solar-blueprint',start:'top bottom',end:'bottom top',scrub:.8}});
 document.querySelectorAll<HTMLElement>('.work-chapter').forEach(chapter=>{
  gsap.fromTo(chapter.querySelector('.work-image'),{clipPath:'inset(10% 4% 10% 4%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:chapter,start:'top 90%',end:'top 12%',scrub:.7}});
  gsap.from(chapter.querySelector('.work-caption'),{y:52,ease:'none',scrollTrigger:{trigger:chapter.querySelector('.work-caption'),start:'top bottom',end:'top 65%',scrub:.6}});
 });
 const journey=gsap.timeline({scrollTrigger:{trigger:'.pavilion-journey',start:'top top',end:'bottom bottom',scrub:.55}});
 journey.to('.journey-track i',{scaleY:1,ease:'none'},0).to('.journey-heading',{y:-26,opacity:.55,ease:'none'},0);
 document.querySelectorAll('.material-sample svg').forEach((svg,i)=>gsap.from(svg,{y:32+i*14,ease:'none',scrollTrigger:{trigger:'.material-samples',start:'top bottom',end:'top 45%',scrub:.6}}));
 gsap.fromTo('.terrain-lines',{yPercent:7},{yPercent:-7,ease:'none',scrollTrigger:{trigger:'.territory',start:'top bottom',end:'bottom top',scrub:.8}});
});

const abort=new AbortController();
const materialButtons=Array.from(document.querySelectorAll<HTMLButtonElement>('[data-material]'));
materialButtons.forEach(button=>button.disabled=false);
materialButtons.forEach(button=>button.addEventListener('click',()=>{
 materialButtons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
 const material=button.dataset.material!;
 const host=document.getElementById('pavilion-scene');if(host)host.dataset.material=material;
 const label=button.querySelector('strong')?.textContent;
 const status=document.querySelector<HTMLElement>('.material-feedback');if(status)status.textContent=`Acabado seleccionado: ${label}.`;
 window.dispatchEvent(new CustomEvent('norte:material',{detail:material}));
},{signal:abort.signal}));
window.addEventListener('pagehide',()=>abort.abort(),{once:true});
