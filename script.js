const weddingDate = new Date("2026-08-23T11:45:00+05:30").getTime();

function updateCountdown(){
  const now = Date.now();
  const distance = weddingDate - now;
  if(distance <= 0){
    document.getElementById("countdown").innerHTML = "<div style='grid-column:1/-1'><strong>♡</strong><span>The wedding day is here</span></div>";
    if(document.getElementById("heroDays")) document.getElementById("heroDays").textContent = "Today";
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
  if(document.getElementById("heroDays")) document.getElementById("heroDays").textContent = String(d);
}
updateCountdown();
setInterval(updateCountdown,1000);

const audio = document.getElementById("weddingMusic");
const toggle = document.getElementById("musicToggle");
const icon = document.getElementById("musicIcon");
const text = document.getElementById("musicText");

const setMusicState = (isPlaying) => {
  icon.textContent = isPlaying ? "❚❚" : "♫";
  text.textContent = isPlaying ? "Pause" : "Music";
};

audio.volume = 0.5;
audio.preload = "auto";
audio.autoplay = true;

audio.addEventListener("play", () => setMusicState(true));
audio.addEventListener(" ", () => setMusicState(false));

async function startMusic(){
  if(!audio.src && !audio.querySelector("source")){
    return;
  }

  try {
    await audio.play();
  } catch (e) {
    setMusicState(false);
  }
}

window.addEventListener("load", () => {
  startMusic();
});

toggle.addEventListener("click", async () => {
  if(!audio.src && !audio.querySelector("source")){
    return;
  }

  if(audio.paused){
    await startMusic();
  } else {
    audio.pause();
    setMusicState(false);
  }
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const gallerySlides = Array.from(document.querySelectorAll(".photo-slide"));
let activeIndex = 0;
let autoSlide;

function updateCarousel(nextIndex = activeIndex){
  activeIndex = (nextIndex + gallerySlides.length) % gallerySlides.length;
  const isMobile = window.innerWidth <= 680;
  const travel = isMobile ? 115 : 250;

  gallerySlides.forEach((slide, index) => {
    const diff = (index - activeIndex + gallerySlides.length) % gallerySlides.length;
    const normalized = diff > gallerySlides.length / 2 ? diff - gallerySlides.length : diff;
    const abs = Math.abs(normalized);
    const offset = normalized * travel;
    const baseScale = isMobile ? 0.76 : 0.82;
    const scale = index === activeIndex ? 1 : baseScale - abs * 0.08;
    const opacity = index === activeIndex ? 1 : isMobile ? 0.7 - abs * 0.08 : 0.5 - abs * 0.12;
    const blur = abs > 1 ? "1.2px" : "0px";
    const zIndex = 10 - abs;
    slide.style.setProperty("--offset", `${offset}px`);
    slide.style.setProperty("--scale", scale);
    slide.style.setProperty("--opacity", opacity);
    slide.style.setProperty("--blur", blur);
    slide.style.setProperty("--z", zIndex);
    slide.classList.toggle("active", index === activeIndex);
  });
}

function startAutoSlide(){
  clearInterval(autoSlide);
  autoSlide = setInterval(()=> updateCarousel(activeIndex + 1), 2600);
}

if(gallerySlides.length){
  updateCarousel(0);
  startAutoSlide();
  document.querySelector(".nav-btn.prev").addEventListener("click", ()=> {
    updateCarousel(activeIndex - 1);
    startAutoSlide();
  });
  document.querySelector(".nav-btn.next").addEventListener("click", ()=> {
    updateCarousel(activeIndex + 1);
    startAutoSlide();
  });
}

document.querySelectorAll(".photo-slide, .invitation-frame img").forEach(el=>{
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
