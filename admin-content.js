
(() => {
  "use strict";

  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);

  const getJson = async path => {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(path);
    return response.json();
  };

  const loadSite = async () => {
    try {
      const data = await getJson("/content/site.json");
      const textValues = {
        hero_kicker: data.hero?.kicker,
        hero_text: data.hero?.text,
        about_text_1: data.about?.text_1,
        about_text_2: data.about?.text_2,
        careers_text: data.careers?.text
      };
      Object.entries(textValues).forEach(([key, value]) => {
        const element = document.querySelector(`[data-cms="${key}"]`);
        if (element && value != null) element.textContent = value;
      });
      const htmlValues = {
        hero_title: data.hero?.title,
        about_title: data.about?.title
      };
      Object.entries(htmlValues).forEach(([key, value]) => {
        const element = document.querySelector(`[data-cms-html="${key}"]`);
        if (element && value != null) element.innerHTML = value;
      });
    } catch (_) {}
  };

  const loadHours = async () => {
    try {
      const data = await getJson("/content/hours.json");
      const wrapper = document.querySelector("[data-hours]");
      if (!wrapper || !Array.isArray(data.days)) return;
      wrapper.querySelectorAll(":scope > div").forEach(el => el.remove());
      const button = wrapper.querySelector(".btn");
      data.days.forEach(day => {
        const row = document.createElement("div");
        row.innerHTML = `<span>${escapeHtml(day.label)}</span><b>${escapeHtml(day.time)}</b>`;
        wrapper.insertBefore(row, button);
      });
      if (data.notice_visible && data.notice) {
        const note = document.createElement("p");
        note.className = "hours-notice";
        note.textContent = data.notice;
        wrapper.insertBefore(note, button);
      }
    } catch (_) {}
  };

  const loadPrices = async () => {
    try {
      const data = await getJson("/content/prices.json");
      const grid = document.querySelector("[data-prices-grid]");
      if (!grid || !Array.isArray(data.categories)) return;
      grid.innerHTML = data.categories.map((category, index) => `
        <article class="price-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(category.title)}</h3>
          ${(category.items || []).map(item => `
            <a href="https://www.bokadirekt.se/places/salong-alexander-43090" target="_blank" rel="noopener">
              <b>${escapeHtml(item.name)}</b>
              <em>${escapeHtml(item.price)} ↗</em>
            </a>`).join("")}
        </article>`).join("");
      const intro = document.querySelector("#priser .section-head > p:last-child");
      if (intro && data.intro) intro.textContent = data.intro;
    } catch (_) {}
  };

  const loadGallery = async () => {
    try {
      const data = await getJson("/content/gallery.json");
      const track = document.querySelector("[data-gallery-track]");
      const total = document.querySelector("[data-gallery-total]");
      if (!track || !Array.isArray(data.images) || !data.images.length) return;
      track.innerHTML = data.images.map((item, index) => `
        <figure class="salon-slide${index === 0 ? " active" : ""}">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || "Salong Alexander")}" loading="${index === 0 ? "eager" : "lazy"}">
        </figure>`).join("");
      if (total) total.textContent = String(data.images.length).padStart(2, "0");
      document.dispatchEvent(new CustomEvent("salon-gallery-ready"));
    } catch (_) {
      document.dispatchEvent(new CustomEvent("salon-gallery-ready"));
    }
  };

  const loadOffer = async () => {
    try {
      const data = await getJson("/content/offer.json");
      const section = document.querySelector("[data-offer-section]");
      if (!section) return;
      section.hidden = !data.visible;
      if (!data.visible) return;
      const map = {
        "[data-offer-kicker]": data.kicker,
        "[data-offer-title]": data.title,
        "[data-offer-text]": data.text
      };
      Object.entries(map).forEach(([selector, value]) => {
        const el = section.querySelector(selector);
        if (el && value != null) el.textContent = value;
      });
      const img = section.querySelector("[data-offer-image]");
      if (img && data.image) img.src = data.image;
      const btn = section.querySelector("[data-offer-button]");
      if (btn) {
        btn.href = data.button_link || "#kontakt";
        btn.childNodes[0].nodeValue = `${data.button_text || "Läs mer"} `;
      }
    } catch (_) {}
  };

  Promise.all([loadSite(), loadHours(), loadPrices(), loadGallery(), loadOffer()]);
})();
