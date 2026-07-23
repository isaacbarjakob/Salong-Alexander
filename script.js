const menuBtn=document.querySelector(".menu-btn");const nav=document.querySelector(".nav");if(menuBtn){menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)})}document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));document.getElementById("year").textContent=new Date().getFullYear();

// Kundresultat – automatiskt bildspel med pilar, punkter och swipe.
const resultSlider = document.querySelector(".result-slider");
if (resultSlider) {
  const slides = [...resultSlider.querySelectorAll(".result-slide")];
  const dots = [...resultSlider.querySelectorAll(".slider-dots button")];
  const counter = resultSlider.querySelector(".slider-counter b");
  const prev = resultSlider.querySelector(".slider-prev");
  const next = resultSlider.querySelector(".slider-next");
  let current = 0;
  let timer;
  let startX = 0;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    counter.textContent = String(current + 1).padStart(2, "0");
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5000);
  };

  prev.addEventListener("click", () => { showSlide(current - 1); restart(); });
  next.addEventListener("click", () => { showSlide(current + 1); restart(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); restart(); }));

  resultSlider.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].clientX;
  }, {passive:true});

  resultSlider.addEventListener("touchend", (event) => {
    const diff = event.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 45) {
      showSlide(diff > 0 ? current - 1 : current + 1);
      restart();
    }
  }, {passive:true});

  resultSlider.addEventListener("mouseenter", () => clearInterval(timer));
  resultSlider.addEventListener("mouseleave", restart);
  restart();
}



let salonGalleryCleanup = null;
const initSalonGallery = () => {
  salonGalleryCleanup?.();
  const slider = document.querySelector(".salon-slider");
  if (!slider) return;
  const slides = [...slider.querySelectorAll(".salon-slide")];
  const counter = slider.querySelector(".salon-counter b");
  const prev = slider.querySelector(".salon-prev");
  const next = slider.querySelector(".salon-next");
  if (!slides.length) return;
  let current = 0;
  let timer;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    if (counter) counter.textContent = String(current + 1).padStart(2, "0");
  };
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 5500);
  };
  const prevHandler = () => { show(current - 1); restart(); };
  const nextHandler = () => { show(current + 1); restart(); };
  prev?.addEventListener("click", prevHandler);
  next?.addEventListener("click", nextHandler);
  restart();
  salonGalleryCleanup = () => {
    clearInterval(timer);
    prev?.removeEventListener("click", prevHandler);
    next?.removeEventListener("click", nextHandler);
  };
};
document.addEventListener("salon-gallery-ready", initSalonGallery);
setTimeout(initSalonGallery, 900);
