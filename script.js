const PHONE_PRIMARY = "919931672157";
const BUSINESS_NAME = "Smart RO Service Center";

const translations = {
  en: {
    navServices: "Services",
    navProducts: "Products",
    navBooking: "Booking",
    navContact: "Contact",
    callNow: "Call Now",
    heroEyebrow: "Authorized Sales & Service Provider Since 2009",
    heroTitle: "Pure Water<br />Trusted Service",
    heroText:
      "Smart RO Service Center provides dependable purifier sales, servicing, and maintenance for homes, offices, and schools.",
    bookService: "Book Service",
    getQuote: "Get Quote",
    metricYears: "Years of trusted service",
    metricBrands: "Major purifier brands covered",
    metricBooking: "Fast booking by call or WhatsApp",
    brandsTitle: "Brands We Handle",
    serviceTitle: "Solutions for Offices & Schools",
    service25: "Compact commercial purifier system. Call for details.",
    service50: "Efficient capacity for medium usage. Call for details.",
    service200: "Higher throughput for larger facilities. Call for details.",
    service1000: "Industrial-grade water purification. Call for details.",
    trustTitle: "Professional Service That Common People Can Trust",
    bookingTitle: "Send an Enquiry by Email",
    estimatorTitle: "Quick Capacity Estimator",
    peopleCountLabel: "Approx. people count",
    recommended: "Recommended:",
    sendEmail: "Send Email Enquiry"
  },
  hi: {
    navServices: "Services",
    navProducts: "Products",
    navBooking: "Booking",
    navContact: "Contact",
    callNow: "Call Now",
    heroEyebrow: "Authorized Sales & Service Provider Since 2009",
    heroTitle: "Pure Water<br />Trusted Service",
    heroText:
      "Smart RO Service Center homes, offices, aur schools ke liye purifier sales, service, aur maintenance support deta hai.",
    bookService: "Book Service",
    getQuote: "Get Quote",
    metricYears: "Years of trusted service",
    metricBrands: "Major purifier brands covered",
    metricBooking: "Fast booking by call or WhatsApp",
    brandsTitle: "Brands We Handle",
    serviceTitle: "Solutions for Offices & Schools",
    service25: "Compact commercial purifier system. Call for details.",
    service50: "Efficient capacity for medium usage. Call for details.",
    service200: "Higher throughput for larger facilities. Call for details.",
    service1000: "Industrial-grade water purification. Call for details.",
    trustTitle: "Professional Service That Common People Can Trust",
    bookingTitle: "Send an Enquiry by Email",
    estimatorTitle: "Quick Capacity Estimator",
    peopleCountLabel: "Approx. people count",
    recommended: "Recommended:",
    sendEmail: "Send Email Enquiry"
  }
};

function whatsappUrl(service = "a service") {
  const message = `Hello ${BUSINESS_NAME}. I want to book ${service}. Please contact me.`;
  return `https://wa.me/${PHONE_PRIMARY}?text=${encodeURIComponent(message)}`;
}

function revealSections() {
  const items = document.querySelectorAll(".reveal, .stagger-wrap");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupWhatsAppLinks() {
  document.querySelectorAll(".wa-book").forEach((link) => {
    const service = link.dataset.service || "a service";
    link.href = whatsappUrl(service);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const waFromForm = document.querySelector("#waFromForm");
  const service = document.querySelector("#service");

  function updateFormWhatsApp() {
    const selected = service?.value || "a service";
    if (waFromForm) {
      waFromForm.href = whatsappUrl(selected);
      waFromForm.target = "_blank";
      waFromForm.rel = "noopener noreferrer";
    }
  }

  service?.addEventListener("change", updateFormWhatsApp);
  updateFormWhatsApp();
}

function setupEstimator() {
  const peopleCount = document.querySelector("#peopleCount");
  const recommendedPlan = document.querySelector("#recommendedPlan");
  const selectedService = document.querySelector("#selectedService");

  function getPlan(count) {
    if (count <= 25) return "25 LPH RO";
    if (count <= 75) return "50 LPH RO";
    if (count <= 200) return "100/200 LPH RO";
    return "500/1000 LPH RO";
  }

  function updatePlan() {
    if (!peopleCount || !recommendedPlan) return;
    const plan = getPlan(Number(peopleCount.value));
    recommendedPlan.textContent = plan;
    if (selectedService) selectedService.value = plan;
  }

  peopleCount?.addEventListener("input", updatePlan);
  updatePlan();
}

function setupLanguageToggle() {
  const button = document.querySelector("#langToggle");
  let language = "en";

  function applyLanguage() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[language][key]) element.textContent = translations[language][key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.dataset.i18nHtml;
      if (translations[language][key]) element.innerHTML = translations[language][key];
    });
  }

  button?.addEventListener("click", () => {
    language = language === "en" ? "hi" : "en";
    applyLanguage();
  });
}

function setupBrandJump() {
  document.querySelectorAll(".brand-jump").forEach((link) => {
    link.addEventListener("click", () => {
      const brand = link.dataset.brand;
      document.querySelectorAll(".product-tile").forEach((tile) => {
        tile.classList.toggle("brand-match", Boolean(brand && tile.dataset.brand === brand));
      });
    });
  });
}

function setupBookingForm() {
  const form = document.querySelector("#bookingForm");
  const status = document.querySelector("#formStatus");

  form?.addEventListener("submit", () => {
    if (!status) return;
    status.className = "form-status ok";
    status.textContent = "Sending your enquiry...";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#year").textContent = new Date().getFullYear();
  revealSections();
  setupWhatsAppLinks();
  setupEstimator();
  setupLanguageToggle();
  setupBrandJump();
  setupBookingForm();
});
