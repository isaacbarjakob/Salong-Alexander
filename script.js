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
  resultSlider.addEventListener("touchstart", (event) => { startX = event.changedTouches[0].clientX; }, {passive:true});
  resultSlider.addEventListener("touchend", (event) => {
    const diff = event.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 45) { showSlide(diff > 0 ? current - 1 : current + 1); restart(); }
  }, {passive:true});
  resultSlider.addEventListener("mouseenter", () => clearInterval(timer));
  resultSlider.addEventListener("mouseleave", restart);
  restart();
}

const salonSlider=document.querySelector(".salon-slider");if(salonSlider){const slides=[...salonSlider.querySelectorAll(".salon-slide")];const counter=salonSlider.querySelector(".salon-counter b");let current=0;const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle("active",n===current));counter.textContent=String(current+1).padStart(2,"0")};salonSlider.querySelector(".salon-prev").addEventListener("click",()=>show(current-1));salonSlider.querySelector(".salon-next").addEventListener("click",()=>show(current+1));}

// Kortare och mer kundfokuserad sida.
(() => {
  const about = document.querySelector('.about');
  if (about) about.style.display = 'none';

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
    if (tag) tag.textContent = '05 / OMDÖMEN & VARFÖR OSS';
  }

  const contact = document.querySelector('.contact');
  if (contact) contact.style.display = 'none';
  const footerCta = document.querySelector('.footer-cta');
  if (footerCta) footerCta.style.display = 'none';
  const careers = document.querySelector('.careers');
  if (careers) careers.style.display = 'none';

  document.querySelectorAll('.nav a[href="#om"], .nav a[href="#jobb"]').forEach(el => el.remove());

  const footer = document.querySelector('.site-footer');
  if (footer) footer.id = 'kontakt';

  const main = document.querySelector('main');
  const salong = document.querySelector('#salongen');
  const priser = document.querySelector('#priser');
  const team = document.querySelector('#teamet');
  const resultat = document.querySelector('#resultat');
  const omdomen = document.querySelector('.real-reviews');
  [salong, priser, team, resultat, omdomen].forEach(section => { if (section && main) main.appendChild(section); });

  const sectionLabels = [
    ['#salongen .section-tag','01 / SALONGEN'],
    ['#priser .section-tag','02 / BEHANDLINGAR & PRISER'],
    ['#teamet .section-tag','03 / MÖT TEAMET'],
    ['#resultat .section-tag','04 / KUNDRESULTAT']
  ];
  sectionLabels.forEach(([selector,text])=>{const el=document.querySelector(selector);if(el)el.textContent=text});

  const footerQuick = [...document.querySelectorAll('.footer-group')].find(group => group.querySelector('h3')?.textContent.trim() === 'Snabblänkar');
  if (footerQuick && !footerQuick.querySelector('.footer-careers-link')) {
    const link = document.createElement('a');
    link.className = 'footer-careers-link';
    link.href = 'mailto:kontakt@salongalexander.se?subject=Intresseanmälan%20-%20Jobba%20hos%20Salong%20Alexander';
    link.textContent = 'Jobba hos oss ↗';
    footerQuick.appendChild(link);
  }

  const style = document.createElement('style');
  style.id = 'customer-first-overrides';
  style.textContent = `
    @media (min-width:761px){
      .section{padding:5.2vw 6vw}
      .section-tag{margin-bottom:1.7rem}
      .section-head{margin-bottom:2.3rem}
      .salon-track,.salon-slide img{height:520px}
      .result-track,.result-slide img{height:550px}
      .team-photo{aspect-ratio:4/4.15}
    }
    .compact-why{margin-bottom:2.3rem}
    .compact-why article{min-height:180px;padding:1.4rem}
    .compact-why article strong{font-size:1.4rem}
    .compact-why article p{font-size:.88rem;margin-bottom:0}
    .real-reviews .google-merged-head{margin-top:2.3rem;padding-top:1.8rem}
    @media (max-width:760px){
      .section{padding:54px 22px}
      .section-tag{margin-bottom:1.6rem}
      .section-head{margin-bottom:2.1rem}
      .salon-track,.salon-slide img{height:400px}
      .result-track,.result-slide img{height:455px}
      .compact-why article{min-height:auto}
    }
  `;
  document.head.appendChild(style);
})();
