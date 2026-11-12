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
 $("#editionCount").textContent=number(selectedIndex)+" / "+number(d.projects.length);
}
function makeBook(){
 $("#editionIndex").innerHTML=d.projects.map((p,i)=>'<button type="button" aria-pressed="false" data-idx="'+i+'"><small>'+esc(p.number)+'</small><span>'+esc(p.title)+'</span><span>↗</span></button>').join("");
 $$("#editionIndex button").forEach(b=>b.addEventListener("click",()=>updateBook(Number(b.dataset.idx))));
 $("#prevEdition").addEventListener("click",()=>updateBook(selectedIndex-1));
 $("#nextEdition").addEventListener("click",()=>updateBook(selectedIndex+1));
 updateBook(0);
}
function projectMedia(src,label){
 return '<div class="portfolio-media">'+empty(label,src)+cover(src,label)+'</div>';
}
function openProject(i){
 updateBook(i);
 const p=d.projects[selectedIndex], section=$("#project");
 $("#projectNumber").textContent="CHAPTER "+p.number+" / "+p.category.toUpperCase();
 section.style.setProperty("--project-theme",p.theme);
 section.style.setProperty("--project-paper",p.paper);
 section.style.setProperty("--project-foreground",p.foreground);
 const identity=p.identity||{};
 const palette=(identity.palette&&identity.palette.length?identity.palette:[{name:"Primary",hex:p.theme},{name:"Secondary",hex:p.paper},{name:"Accent",hex:p.accent}]);
 const colorHtml=palette.map(c=>'<div class="identity-color"><div class="color-disc" style="background:'+esc(c.hex)+'"></div><span>'+esc(c.name||"")+'</span><small>'+esc(c.hex)+'</small></div>').join("");
 const type=identity.typography||["À compléter","À compléter"];
 const elements=identity.elements||[];
 const elementHtml=elements.map(x=>'<span class="element-tag">'+esc(x)+'</span>').join("")||'<span class="element-tag">Éléments à ajouter</span>';
 const products=p.products||[];
 const productsHtml=products.map((prod,j)=>'<article class="product-showcase"><div class="product-heading"><span>'+number(j)+' / THE WORK</span><h4>'+esc(prod.name)+'</h4></div><div class="product-pair"><div class="product-side"><div class="pair-kicker">MOCKUP / PRODUCT</div>'+projectMedia(prod.mockup,prod.name+" · Mockup")+'</div><div class="product-side"><div class="pair-kicker">'+esc(prod.flatLabel||"FLAT DESIGN / ÉTIQUETTE")+'</div>'+projectMedia(prod.label,prod.name+" · Étiquette à plat")+'</div></div></article>').join("");
 const featured=productsHtml||'<div class="product-pair"><div class="product-side">'+projectMedia(p.images[3]?.src||p.cover,"Mockup final")+'</div><div class="product-side">'+projectMedia(p.images[4]?.src||p.cover,"Design à plat")+'</div></div>';
 const supportImages=p.supports||[];
 const supports=supportImages.length?'<div class="support-grid">'+supportImages.map(a=>'<figure>'+projectMedia(a.src,a.label)+'<figcaption>'+esc(a.label)+'</figcaption></figure>').join("")+'</div>':"";
 const compare='<div class="compact-reveal"><div class="reveal-label"><span>REVEAL THE DESIGN</span><span>AVANT / APRÈS</span></div><div class="reveal-frame" style="--position:50%"><div class="reveal-pane after">'+empty("Final",p.after)+cover(p.after,"Résultat final "+p.title)+'<span class="image-label">APRÈS</span></div><div class="reveal-pane before">'+empty("Concept",p.before)+cover(p.before,"Concept "+p.title)+'<span class="image-label">AVANT</span></div><div class="reveal-divider"></div><input class="reveal-range" type="range" min="0" max="100" value="50" aria-label="Comparer le concept et le résultat"></div></div>';
 $("#projectContent").innerHTML=
 '<div class="case-cover case-cover-clean"><div class="case-cover-copy"><span class="case-eyebrow">THE CREATIVE EDITIONS / CHAPTER '+esc(p.number)+'</span><div><h2>'+esc(p.title)+'</h2><p>'+esc(p.story)+'</p></div><span class="case-eyebrow">'+esc(p.category)+'</span></div><div class="case-cover-media">'+empty("Cover",p.cover)+cover(p.cover,p.title)+'</div></div>'+
 '<div class="case-summary"><div class="summary-item"><span>01 / PROJECT GOAL</span><p>'+esc(p.goal||p.challenge)+'</p></div><div class="summary-item"><span>02 / DESIGN DECISION</span><p>'+esc(p.decision||p.idea)+'</p></div></div>'+
 '<section class="identity-board" aria-label="Identité visuelle de '+esc(p.title)+'"><div class="work-section-head"><span>03 / VISUAL IDENTITY</span><h3>Visual <i>Identity.</i></h3></div><div class="identity-panels"><div class="identity-logo"><div class="pair-kicker">LOGO / MARK</div>'+projectMedia(identity.logo||p.images[1]?.src||p.cover,p.title+" logo")+'</div><div class="identity-details"><div class="identity-panel"><span class="pair-kicker">COLOR PALETTE</span><div class="color-palette">'+colorHtml+'</div></div><div class="identity-panel"><span class="pair-kicker">TYPOGRAPHY</span><div class="type-pair">'+type.map(t=>'<div><strong>Aa</strong><small>'+esc(t)+'</small></div>').join("")+'</div></div><div class="identity-panel"><span class="pair-kicker">GRAPHIC ELEMENTS</span><div class="element-tags">'+elementHtml+'</div></div></div></div></section>'+
 '<section class="final-work" aria-label="Travaux de '+esc(p.title)+'"><div class="work-section-head"><span>04 / SELECTED WORK</span><h3>The Final <i>Work.</i></h3><p>'+esc(p.workIntro||"Le design appliqué : mockup et fichier à plat, côte à côte.")+'</p></div>'+featured+supports+compare+'</section>';
 const slider=$(".reveal-range",section);
 if(slider)slider.addEventListener("input",e=>$(".reveal-frame",section).style.setProperty("--position",e.target.value+"%"));
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