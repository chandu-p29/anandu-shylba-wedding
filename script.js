const weddingDate = new Date("2026-08-23T11:45:00+05:30").getTime();

function updateCountdown(){
  const now = Date.now();
  const distance = weddingDate - now;
  if(distance <= 0){
    document.getElementById("countdown").innerHTML = "<div style='grid-column:1/-1'><strong>♡</strong><span>The wedding day is here</span></div>";
    return;
  }
  const d = Math.floor(distance / 86400000);
  const h = Math.floor((distance % 86400000) / 3600000);
  const m = Math.floor((distance % 3600000) / 60000);
  const s = Math.floor((distance % 60000) / 1000);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const audio = document.getElementById("weddingMusic");
const toggle = document.getElementById("musicToggle");
const icon = document.getElementById("musicIcon");
const text = document.getElementById("musicText");

toggle.addEventListener("click", async () => {
  if(!audio.src || audio.readyState === 0){
    alert("Add your chosen song as assets/music.mp3, then refresh the page.");
    return;
  }
  if(audio.paused){
    try { await audio.play(); icon.textContent="Ⅱ"; text.textContent="Pause"; }
    catch(e){ alert("Tap the music button again to start the music."); }
  }else{
    audio.pause(); icon.textContent="♫"; text.textContent="Music";
  }
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".gallery-item, .invitation-frame img").forEach(el=>{
  el.addEventListener("click", ()=>{
    const src = el.dataset.src || el.src;
    lightboxImage.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImage.src="";
}
document.getElementById("closeLightbox").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeLightbox(); });
