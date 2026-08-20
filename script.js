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

const salonSlider=document.querySelector(".salon-slider");if(salonSlider){const slides=[...salonSlider.querySelectorAll(".salon-slide")];const counter=salonSlider.querySelector(".salon-counter b");let current=0;const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle("active",n===current));counter.textContent=String(current+1).padStart(2,"0")};salonSlider.querySelector(".salon-prev").addEventListener("click",()=>show(current-1));salonSlider.querySelector(".salon-next").addEventListener("click",()=>show(current+1));}

// V25 compact: kortare sidflöde utan att röra LL-admin/data-attribut i HTML.
(() => {
  const whySection = document.querySelector('.why-us');
  const reviewsSection = document.querySelector('.real-reviews');
  const whyGrid = whySection?.querySelector('.why-grid');
  const reviewCards = reviewsSection?.querySelector('.review-cards');

  if (whyGrid && reviewCards && reviewsSection) {
    const compactWhy = whyGrid.cloneNode(true);
    compactWhy.classList.add('compact-why');
    reviewsSection.insertBefore(compactWhy, reviewCards);
    whySection.style.display = 'none';
    const tag = reviewsSection.querySelector('.section-tag');
    if (tag) tag.textContent = '06 / OMDÖMEN & VARFÖR OSS';
  }

  // Kontakt, öppettider och karta finns redan komplett i footern.
  const contact = document.querySelector('.contact');
  if (contact) contact.style.display = 'none';

  // Den extra stora CTA:n längst ned dubblar den fasta bokningsknappen och pris-CTA:n.
  const footerCta = document.querySelector('.footer-cta');
  if (footerCta) footerCta.style.display = 'none';

  const footer = document.querySelector('.site-footer');
  if (footer) footer.id = 'kontakt';

  const sectionLabels = [
    ['#salongen .section-tag','02 / SALONGEN'],
    ['#priser .section-tag','03 / BEHANDLINGAR & PRISER'],
    ['#resultat .section-tag','04 / VÅRT HANTVERK'],
    ['#teamet .section-tag','05 / MÖT TEAMET']
  ];
  sectionLabels.forEach(([selector,text])=>{const el=document.querySelector(selector);if(el)el.textContent=text});

  const style = document.createElement('style');
  style.id = 'v25-compact-overrides';
  style.textContent = `
    @media (min-width:761px){
      .section{padding:5.5vw 6vw}
      .section-tag{margin-bottom:1.8rem}
      .section-head{margin-bottom:2.5rem}
      .about-image img{height:560px}
      .salon-track,.salon-slide img{height:540px}
      .result-track,.result-slide img{height:570px}
      .team-photo{aspect-ratio:4/4.2}
    }
    .compact-why{margin-bottom:2.5rem}
    .compact-why article{min-height:190px;padding:1.5rem}
    .compact-why article strong{font-size:1.45rem}
    .compact-why article p{font-size:.9rem;margin-bottom:0}
    .real-reviews .google-merged-head{margin-top:2.5rem;padding-top:2rem}
    .careers{padding-top:5vw;padding-bottom:5vw}
    @media (max-width:760px){
      .section{padding:58px 22px}
      .section-tag{margin-bottom:1.8rem}
      .section-head{margin-bottom:2.4rem}
      .salon-track,.salon-slide img{height:420px}
      .result-track,.result-slide img{height:480px}
      .compact-why article{min-height:auto}
      .careers{padding-top:58px;padding-bottom:58px}
    }
  `;
  document.head.appendChild(style);
})();
