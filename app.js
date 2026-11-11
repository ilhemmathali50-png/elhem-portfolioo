(()=>{
"use strict";
const d=window.PORTFOLIO; if(!d){console.error("Missing content.js");return;}
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cover=(src,name,cls="")=>'<img class="'+esc(cls)+'" src="'+esc(src)+'" alt="'+esc(name)+'" loading="lazy">';
const empty=(title,file)=>'<div class="placeholder"><strong>'+esc(title)+'</strong><small>Photo à ajouter<br>'+esc(file)+'</small></div>';
const number=i=>String(i+1).padStart(2,"0");
let selectedIndex=0;
function updateBook(i){
 selectedIndex=(i+d.projects.length)%d.projects.length;
 const p=d.projects[selectedIndex];
 $$("#editionIndex button").forEach((b,j)=>{b.classList.toggle("active",j===selectedIndex);b.setAttribute("aria-pressed",String(j===selectedIndex));});
 const right=$("#bookRight"); right.style.backgroundColor=p.theme;
 $("#editionPreview").innerHTML='<span class="edition-num">EDITION '+esc(p.number)+' / SELECTED WORK</span><div class="edition-placeholder">'+cover(p.cover,p.title)+'</div><h3>'+esc(p.title)+'</h3><p class="edition-tagline">'+esc(p.story)+'</p><div class="edition-category">'+esc(p.category)+'</div><button class="open-project" type="button">Lire le chapitre ↗</button>';
 // All content below remains visible if the image is not provided.
 $$("#editionPreview img").forEach(img=>{img.onerror=()=>img.remove();});
 $(".open-project").addEventListener("click",()=>openProject(selectedIndex));
 $("#editionCount").textContent=number(selectedIndex)+" / "+number(d.projects.length-1);
}
function makeBook(){
 $("#editionIndex").innerHTML=d.projects.map((p,i)=>'<button type="button" aria-pressed="false" data-idx="'+i+'"><small>'+esc(p.number)+'</small><span>'+esc(p.title)+'</span><span>↗</span></button>').join("");
 $$("#editionIndex button").forEach(b=>b.addEventListener("click",()=>updateBook(Number(b.dataset.idx))));
 $("#prevEdition").addEventListener("click",()=>updateBook(selectedIndex-1));
 $("#nextEdition").addEventListener("click",()=>updateBook(selectedIndex+1));
 updateBook(0);
}
function openProject(i){
 updateBook(i); const p=d.projects[selectedIndex];
 const section=$("#project");
 $("#projectNumber").textContent="EDITION "+p.number+" / "+p.category.toUpperCase();
 section.style.setProperty("--project-theme",p.theme);section.style.setProperty("--project-paper",p.paper);section.style.setProperty("--project-foreground",p.foreground);
 const gallery=p.images.map((item,j)=>'<figure class="gallery-item"><div class="media">'+empty(item.label,item.src)+cover(item.src,item.label)+'</div><figcaption>'+number(j)+" / "+esc(item.label)+'</figcaption></figure>').join("");
 $("#projectContent").innerHTML='<div class="case-cover"><div class="case-cover-copy"><span class="case-eyebrow">THE CREATIVE EDITIONS / CHAPTER '+esc(p.number)+'</span><div><h2>'+esc(p.title)+'</h2><p>'+esc(p.story)+'</p></div><span class="case-eyebrow">'+esc(p.category)+'</span></div><div class="case-cover-media">'+empty("Project cover",p.cover)+cover(p.cover,p.title)+'</div></div><div class="case-columns"><div><span class="case-kicker">01 / THE BRIEF</span><h3>The challenge.</h3><p>'+esc(p.challenge)+'</p></div><div><span class="case-kicker">02 / CREATIVE DIRECTION</span><h3>The idea.</h3><p>'+esc(p.idea)+'</p><div class="chips">'+p.deliverables.map(v=>'<span>'+esc(v)+'</span>').join("")+'</div></div></div><div class="project-gallery">'+gallery+'</div><div class="project-reveal"><span class="case-kicker">03 / FROM PROCESS TO FINAL</span><h3>Reveal the <i>Design.</i></h3><p>Faites glisser pour comparer la recherche et le résultat final. Ajoutez vos deux visuels pour chaque édition.</p><div class="reveal-frame" style="--position:50%"><div class="reveal-pane after">'+empty("The Final Design",p.after)+cover(p.after,"Résultat final "+p.title)+'<span class="image-label">AFTER / FINAL</span></div><div class="reveal-pane before">'+empty("The Creative Process",p.before)+cover(p.before,"Recherche initiale "+p.title)+'<span class="image-label">BEFORE / PROCESS</span></div><div class="reveal-divider"></div><input class="reveal-range" type="range" min="0" max="100" value="50" aria-label="Comparer avant et après le design"></div></div>';
 $(".reveal-range").addEventListener("input",e=>$(".reveal-frame").style.setProperty("--position",e.target.value+"%"));
 $$("#projectContent img").forEach(img=>{img.onerror=()=>img.classList.add("is-missing");if(img.complete&&!img.naturalWidth)img.classList.add("is-missing");});
 section.hidden=false;
 section.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
}
function makeAtelier(){
 $("#logoGrid").innerHTML=d.logos.map((l,i)=>'<article class="logo-card"><div class="logo-visual"><div class="logo-placeholder">'+(i+1).toString().padStart(2,"0")+'</div>'+cover(l.image,l.title)+'</div><div class="logo-details"><div><h3>'+esc(l.title)+'</h3><small>'+esc(l.type)+'</small></div><small>STUDY '+number(i)+'</small></div></article>').join("");
 $$("#logoGrid img").forEach(img=>{img.onerror=()=>img.classList.add("is-missing");if(img.complete&&!img.naturalWidth)img.classList.add("is-missing");});
}
function makeJournal(){
 $("#journalList").innerHTML=d.journal.map((a,i)=>'<article class="journal-item"><button type="button" aria-expanded="false" aria-controls="journal-content-'+i+'"><div><span class="journal-kicker">'+esc(a.category)+'</span><h3>'+esc(a.title)+'</h3><p>'+esc(a.summary)+'</p></div><span class="toggle" aria-hidden="true">+</span></button><div id="journal-content-'+i+'" class="journal-body" hidden><p>'+esc(a.body)+'</p></div></article>').join("");
 $$("#journalList article button").forEach(b=>b.addEventListener("click",()=>{const open=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",String(!open));$( "#"+b.getAttribute("aria-controls")).hidden=open;$(".toggle",b).textContent=open?"+":"−";}));
}
function makeAbout(){
 const diplomas=$("#diplomas");
 diplomas.innerHTML=d.diplomas.length?d.diplomas.map(x=>'<div class="diploma"><strong>'+esc(x.title)+'</strong><small>'+esc(x.school)+(x.year?" · "+esc(x.year):"")+'</small></div>').join(""):'<div class="diploma-empty">Diplômes et formations à ajouter avec leurs intitulés exacts, établissements et années.</div>';
 const labels=[["linkedin","LinkedIn"],["behance","Behance"],["instagram","Instagram"],["whatsapp","WhatsApp"],["email","Email"]];
 $("#socialLinks").innerHTML=labels.filter(([k])=>d.social[k]).map(([k,l])=>{let v=d.social[k].trim();if(k==="email")v="mailto:"+v;else if(k==="whatsapp"&&!v.startsWith("https://"))v="https://wa.me/"+v.replace(/\D/g,"");else if(!v.startsWith("https://"))return "";return '<a href="'+esc(v)+'" target="'+(k==="email"?"_self":"_blank")+'" rel="noopener noreferrer">'+l+' ↗</a>';}).join("")||'<p class="fine-note">LinkedIn, Behance, Instagram et WhatsApp seront affichés ici après ajout de vos liens.</p>';
}
const services=["Brand Identity","Packaging Design","Creative Content","Un projet combiné"];let service=services[0];
function makeBrief(){
 $("#serviceChoices").innerHTML=services.map((s,i)=>'<button type="button" aria-pressed="'+(i===0?"true":"false")+'">'+esc(s)+'</button>').join("");
 $$("#serviceChoices button").forEach((b,i)=>b.addEventListener("click",()=>{service=services[i];$$("#serviceChoices button").forEach((x,j)=>x.setAttribute("aria-pressed",String(i===j)));}));
 $("#briefForm").addEventListener("submit",e=>{
  e.preventDefault();const name=$("#clientName").value.trim(),brand=$("#clientBrand").value.trim(),goal=$("#clientGoal").value.trim(),timing=$("#clientTiming").value;
  if(!name||!goal){if(!name)$("#clientName").focus();else $("#clientGoal").focus();return;}
  const info="Bonjour Elhem,\n\nJe souhaite discuter d'un projet.\n\nNom : "+name+"\nMarque : "+(brand||"À définir")+"\nService : "+service+"\nProjet : "+goal+"\nDémarrage : "+timing+"\n\nMerci.";
  const result=$("#briefResult"); result.hidden=false;result.innerHTML='<strong>Votre brief est prêt.</strong><pre>'+esc(info)+'</pre><div class="result-actions"><button type="button" id="copyBrief">Copier le brief</button>'+(d.social.whatsapp?'<a id="waBrief" target="_blank" rel="noopener noreferrer">Ouvrir WhatsApp ↗</a>':"")+(d.social.email?'<a id="mailBrief">Ouvrir un email ↗</a>':"")+'</div><p class="fine-note">Aucune demande n’est envoyée automatiquement. Utilisez Copier ou votre moyen de contact préféré.</p>';
  $("#copyBrief").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(info);$("#copyBrief").textContent="Copié ✓";}catch{const t=document.createElement("textarea");t.value=info;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();$("#copyBrief").textContent="Copié ✓";}});
  if(d.social.whatsapp){const n=d.social.whatsapp.replace(/\D/g,"");$("#waBrief").href="https://wa.me/"+n+"?text="+encodeURIComponent(info);}
  if(d.social.email){$("#mailBrief").href="mailto:"+encodeURIComponent(d.social.email)+"?subject="+encodeURIComponent("Demande de projet — "+service)+"&body="+encodeURIComponent(info);}
  result.scrollIntoView({behavior:"smooth",block:"nearest"});
 });
}
function initMobile(){
 const navLinks=$(".mobile-tabs a");
 const keys=["home","editions","atelier","journal","story"];
 const setActive=id=>{if(!keys.includes(id))return;navLinks.forEach(a=>{if(a.dataset.tab===id)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});};
 navLinks.forEach(a=>a.addEventListener("click",()=>setActive(a.dataset.tab)));
 if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>{const e=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(e)setActive(e.target.id);},{rootMargin:"-18% 0px -45% 0px",threshold:[0,.1,.2,.4,.6]});keys.map(id=>document.getElementById(id)).filter(Boolean).forEach(el=>observer.observe(el));}
 let xStart=0,yStart=0;const book=$("#editionBook");
 book.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;xStart=e.touches[0].clientX;yStart=e.touches[0].clientY;},{passive:true});
 book.addEventListener("touchend",e=>{if(!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-xStart;const dy=e.changedTouches[0].clientY-yStart;if(Math.abs(dx)>75&&Math.abs(dx)>Math.abs(dy)*1.4&&Math.abs(dy)<100)updateBook(selectedIndex+(dx<0?1:-1));},{passive:true});
 let deferredPrompt=null;const button=$("#installApp"),overlay=$("#installHelp");
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;});
 const standalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
 const isiOS=()=>/iPhone|iPad|iPod/.test(navigator.userAgent);
 const isSafari=()=>/Safari/.test(navigator.userAgent)&&!/CriOS|FxiOS|EdgiOS/.test(navigator.userAgent);
 if(standalone())button.hidden=true;
 const close=()=>{overlay.hidden=true;button.focus();};
 $("#dismissInstall").addEventListener("click",close);$("#installConfirm").addEventListener("click",close);
 overlay.addEventListener("click",e=>{if(e.target===overlay)close();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!overlay.hidden)close();});
 button.addEventListener("click",async()=>{
  if(deferredPrompt){const p=deferredPrompt;deferredPrompt=null;await p.prompt();return;}
  $("#installInstructions").textContent=isiOS()?(isSafari()?"Sur iPhone : touchez Partager, puis « Sur l’écran d’accueil » et confirmez.":"Ouvrez ce site dans Safari, puis touchez Partager et « Sur l’écran d’accueil »."):"Ouvrez le menu du navigateur, puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil » si cette option est disponible.";
  overlay.hidden=false;$("#dismissInstall").focus();
 });
 window.addEventListener("appinstalled",()=>{button.hidden=true;overlay.hidden=true;});
 if("serviceWorker" in navigator&&location.protocol==="https:")window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(e=>console.warn("Service Worker:",e)));
}
function init(){
 $$("[data-fallback]").forEach(img=>{img.onerror=()=>img.classList.add("is-missing");if(img.complete&&!img.naturalWidth)img.classList.add("is-missing");});
 $("#year").textContent=new Date().getFullYear();
 makeBook();makeAtelier();makeJournal();makeAbout();makeBrief();initMobile();
 $("#closeProject").addEventListener("click",()=>{ $("#project").hidden=true;$("#editions").scrollIntoView({behavior:"smooth"});});
 $("#nextProject").addEventListener("click",()=>openProject(selectedIndex+1));
 $("#menuBtn").addEventListener("click",()=>{let open=$("#nav").classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",String(open));$("#menuBtn").setAttribute("aria-label",open?"Fermer le menu":"Ouvrir le menu");});
 $$("#nav a").forEach(a=>a.addEventListener("click",()=>{$("#nav").classList.remove("open");$("#menuBtn").setAttribute("aria-expanded","false");}));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();