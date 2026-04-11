const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const translations = {
  en: {
    navServices: "Services",
    navProducts: "Products",
    navBooking: "Booking",
    navContact: "Contact",
    callNow: "Call Now",
    heroEyebrow: "Authorized Sales & Service Provider Since 2009",
    heroTitle: "Pure Water.<br />Trusted Service.",
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
    waterCooler: "Water Coolers",
    waterCoolerDesc: "Voltas water coolers are available with supply and service support.",
    hotCool: "Hot & Cool RO",
    hotCoolDesc: "Available with 10 litre and 20 litre storage options.",
    trustTitle: "Professional Service That Common People Can Trust",
    bookingTitle: "Send an Enquiry by Email",
    estimatorTitle: "Quick Capacity Estimator",
    peopleCountLabel: "Approx. people count",
    recommended: "Recommended:",
    sendEmail: "Send Email Enquiry",
  },
  hi: {
    navServices: "सेवाएं",
    navProducts: "प्रोडक्ट्स",
    navBooking: "बुकिंग",
    navContact: "संपर्क",
    callNow: "अभी कॉल करें",
    heroEyebrow: "2009 से अधिकृत सेल्स और सर्विस प्रोवाइडर",
    heroTitle: "शुद्ध पानी.<br />विश्वसनीय सेवा.",
    heroText:
      "स्मार्ट RO सर्विस सेंटर घर, ऑफिस और स्कूल के लिए भरोसेमंद प्यूरिफायर सेल्स, सर्विस और मेंटेनेंस देता है।",
    bookService: "सेवा बुक करें",
    getQuote: "कोट पाएं",
    metricYears: "सालों का भरोसेमंद अनुभव",
    metricBrands: "मुख्य ब्रांड्स की सेवा",
    metricBooking: "कॉल या व्हाट्सऐप से तेज बुकिंग",
    brandsTitle: "हम जिन ब्रांड्स पर काम करते हैं",
    serviceTitle: "ऑफिस और स्कूल के लिए समाधान",
    service25: "कंपैक्ट कमर्शियल प्यूरिफायर सिस्टम। जानकारी के लिए कॉल करें।",
    service50: "मध्यम उपयोग के लिए बेहतर क्षमता। जानकारी के लिए कॉल करें।",
    service200: "बड़े संस्थानों के लिए हाई आउटपुट सिस्टम। जानकारी के लिए कॉल करें।",
    service1000: "इंडस्ट्रियल ग्रेड वाटर प्यूरिफिकेशन। जानकारी के लिए कॉल करें।",
    waterCooler: "वॉटर कूलर",
    waterCoolerDesc: "Voltas वॉटर कूलर उपलब्ध हैं, साथ में सर्विस सपोर्ट।",
    hotCool: "हॉट और कूल RO",
    hotCoolDesc: "10 लीटर और 20 लीटर स्टोरेज विकल्प उपलब्ध।",
    trustTitle: "ऐसी प्रोफेशनल सेवा जिस पर आम लोग भरोसा करें",
    bookingTitle: "ईमेल से पूछताछ भेजें",
    estimatorTitle: "क्विक कैपेसिटी एस्टिमेटर",
    peopleCountLabel: "लगभग लोगों की संख्या",
    recommended: "सुझाव:",
    sendEmail: "ईमेल पूछताछ भेजें",
  },
};

let currentLang = "en";
const langToggle = document.getElementById("langToggle");

const applyLanguage = (lang) => {
  const dictionary = translations[lang] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    if (dictionary[key]) {
      node.innerHTML = dictionary[key];
    }
  });
};

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    applyLanguage(currentLang);
    langToggle.textContent = currentLang === "en" ? "EN | HI" : "HI | EN";
  });
}

const revealTargets = document.querySelectorAll(".reveal, .stagger-wrap");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.16,
  }
);

revealTargets.forEach((node) => observer.observe(node));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", active);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const animateMetric = (node) => {
  const raw = node.textContent.trim();
  const target = Number.parseInt(raw, 10);
  if (!Number.isFinite(target)) {
    return;
  }

  let current = 0;
  const suffix = raw.replace(String(target), "");
  const step = Math.max(1, Math.round(target / 40));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    node.textContent = `${current}${suffix}`;
  }, 22);
};

const metricValues = document.querySelectorAll(".hero-metrics strong");
if (metricValues.length) {
  const metricsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          metricValues.forEach((metric) => animateMetric(metric));
          metricsObserver.disconnect();
        }
      });
    },
    { threshold: 0.55 }
  );
  metricsObserver.observe(metricValues[0]);
}

const toWaLink = (phone, message) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const primaryPhone = "919931672157";
const secondaryPhone = "919931075913";

const serviceSelect = document.getElementById("service");
const selectedServiceInput = document.getElementById("selectedService");
const waFromForm = document.getElementById("waFromForm");
const stickyWa = document.getElementById("stickyWa");
const floatingWa = document.getElementById("floatingWa");
const bookingForm = document.getElementById("bookingForm");
const waInlineButtons = document.querySelectorAll(".wa-book");
const peopleCount = document.getElementById("peopleCount");
const recommendedPlan = document.getElementById("recommendedPlan");
const formStatus = document.getElementById("formStatus");

const defaultMessage =
  "Hello Smart RO Service Center. I want to book a service.";

const buildMessageFromForm = () => {
  const name = (document.getElementById("name")?.value || "").trim();
  const phone = (document.getElementById("phone")?.value || "").trim();
  const service = (serviceSelect?.value || "General enquiry").trim();
  const message = (document.getElementById("message")?.value || "").trim();

  return [
    "Hello Smart RO Service Center, I want to book a service.",
    `Name: ${name || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${service || "General enquiry"}`,
    `Message: ${message || "N/A"}`,
  ].join("\n");
};

const refreshGlobalWaLinks = () => {
  const message = buildMessageFromForm();

  if (waFromForm) {
    waFromForm.href = toWaLink(primaryPhone, message);
    waFromForm.target = "_blank";
    waFromForm.rel = "noopener noreferrer";
  }

  if (stickyWa) {
    stickyWa.href = toWaLink(primaryPhone, message || defaultMessage);
  }

  if (floatingWa) {
    floatingWa.href = toWaLink(primaryPhone, message || defaultMessage);
  }
};

if (serviceSelect && selectedServiceInput) {
  serviceSelect.addEventListener("change", () => {
    selectedServiceInput.value = serviceSelect.value || "General enquiry";
    refreshGlobalWaLinks();
  });
}

["name", "phone", "service", "message"].forEach((id) => {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener("input", refreshGlobalWaLinks);
  }
});

waInlineButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const service = button.getAttribute("data-service") || "General enquiry";
    const msg = `Hello Smart RO Service Center. I need details for ${service}. Please contact me.`;
    const phone = index % 2 === 0 ? primaryPhone : secondaryPhone;
    window.open(toWaLink(phone, msg), "_blank", "noopener,noreferrer");
  });
});

if (bookingForm) {
  const submitButton = bookingForm.querySelector('button[type="submit"]');
  const accessKeyInput = bookingForm.querySelector('input[name="access_key"]');
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.classList.remove("ok", "err");
      formStatus.textContent = "Sending your enquiry...";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const formData = new FormData(bookingForm);
      const accessKey =
        accessKeyInput?.value?.trim() || formData.get("access_key")?.toString().trim() || "";

      if (!accessKey) {
        throw new Error("WEB3FORMS_ACCESS_KEY_MISSING");
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("WEB3FORMS_HTTP_ERROR");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "WEB3FORMS_SUBMIT_FAILED");
      }

      if (formStatus) {
        const submittedName =
          (formData.get("name")?.toString().trim() || "").split(" ")[0];
        formStatus.classList.remove("err");
        formStatus.classList.add("ok");
        formStatus.textContent = submittedName
          ? `Form submitted. Thanks for your enquiry, ${submittedName}.`
          : "Form submitted. Thanks for your enquiry.";
      }

      bookingForm.reset();
      if (selectedServiceInput) {
        selectedServiceInput.value = "General enquiry";
      }
      if (recommendedPlan && peopleCount) {
        peopleCount.value = "40";
        recommendedPlan.textContent = "50 LPH RO";
      }
      refreshGlobalWaLinks();
    } catch (error) {
      if (formStatus) {
        formStatus.classList.remove("ok");
        formStatus.classList.add("err");
        if (error instanceof Error && error.message === "WEB3FORMS_ACCESS_KEY_MISSING") {
          formStatus.textContent =
            "Web3Forms access key is missing. Add it in the form and try again.";
        } else {
          formStatus.textContent =
            "Submission failed. Please try again or use WhatsApp booking.";
        }
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          currentLang === "hi" ? "ईमेल पूछताछ भेजें" : "Send Email Enquiry";
      }
    }
  });
}

if (peopleCount && recommendedPlan) {
  const updatePlan = () => {
    const value = Number.parseInt(peopleCount.value, 10);
    if (value <= 40) {
      recommendedPlan.textContent = "50 LPH RO";
    } else if (value <= 120) {
      recommendedPlan.textContent = "100/200 LPH RO";
    } else {
      recommendedPlan.textContent = "500/1000 LPH RO";
    }
  };

  peopleCount.addEventListener("input", updatePlan);
  updatePlan();
}

refreshGlobalWaLinks();
applyLanguage(currentLang);

const modelData = {
  kent: {
    title: "Kent Elegant",
    desc: "Reliable domestic RO unit with clean design and easy service support.",
    image: "KENT ELEGANT.jpg",
    tags: ["RO", "Domestic", "Elegant Design"],
  },
  "aquaguard-black": {
    title: "Aquaguard Black Edition",
    desc: "Premium black body model with long filter life claim and compact profile.",
    image: "WhatsApp Image 2026-04-11 at 22.19.22.jpeg",
    tags: ["Aquaguard", "2-Year Filter", "Compact"],
  },
  "aquaguard-kitchen": {
    title: "Kitchen Placement View",
    desc: "Lifestyle setup preview that helps users visualize in-kitchen installation.",
    image: "WhatsApp Image 2026-04-11 at 22.19.22 (1).jpeg",
    tags: ["Lifestyle", "Kitchen Fit", "Space Saving"],
  },
  "filter-life": {
    title: "2 Year Filter Life Campaign",
    desc: "Marketing visual highlighting durability and long-term filtration confidence.",
    image: "WhatsApp Image 2026-04-11 at 22.19.22 (2).jpeg",
    tags: ["Durability", "Campaign", "Filter Life"],
  },
  stages: {
    title: "7 Stage Purification",
    desc: "Infographic-style visual explaining multi-stage purification components.",
    image: "WhatsApp Image 2026-04-11 at 22.19.22 (3).jpeg",
    tags: ["7 Stage", "Protection", "Filtration"],
  },
};

const modelTabs = document.querySelectorAll(".model-tab");
const modelStageImage = document.getElementById("modelStageImage");
const modelStageTitle = document.getElementById("modelStageTitle");
const modelStageDesc = document.getElementById("modelStageDesc");
const modelStageTags = document.getElementById("modelStageTags");

const updateModelStage = (key) => {
  const model = modelData[key];
  if (!model || !modelStageImage || !modelStageTitle || !modelStageDesc || !modelStageTags) {
    return;
  }

  modelStageImage.src = model.image;
  modelStageImage.alt = model.title;
  modelStageImage.setAttribute("data-lightbox-src", model.image);
  modelStageTitle.textContent = model.title;
  modelStageDesc.textContent = model.desc;
  modelStageTags.innerHTML = model.tags.map((tag) => `<span>${tag}</span>`).join("");
};

modelTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    modelTabs.forEach((node) => node.classList.remove("active"));
    tab.classList.add("active");
    updateModelStage(tab.getAttribute("data-model"));
  });
});

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage) {
    return;
  }
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Preview";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) {
    return;
  }
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

document.querySelectorAll("[data-lightbox-src]").forEach((node) => {
  node.addEventListener("click", () => {
    openLightbox(node.getAttribute("data-lightbox-src"), node.getAttribute("alt"));
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const drawPreviewFallback = (container) => {
  container.querySelectorAll("canvas").forEach((canvas) => {
    const context = canvas.getContext("2d");
    canvas.width = 360;
    canvas.height = 260;
    context.fillStyle = "#eef3f7";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#4e6070";
    context.font = "600 16px Manrope, sans-serif";
    context.fillText("Preview unavailable", 90, 130);
  });
};

const renderPdfPages = async (pdf, container, pageA) => {
  const requested = [pageA, Math.min(pdf.numPages, pageA + 1)];

  for (let i = 0; i < requested.length; i += 1) {
    const pageNo = requested[i];
    const canvas = container.querySelector(`canvas[data-page="${i + 1}"]`);
    if (!canvas || pageNo < 1 || pageNo > pdf.numPages) {
      continue;
    }

    const page = await pdf.getPage(pageNo);
    const viewport = page.getViewport({ scale: 1 });
    const targetWidth = Math.min(420, Math.floor(container.clientWidth / 2));
    const scale = targetWidth / viewport.width;
    const scaled = page.getViewport({ scale });

    const context = canvas.getContext("2d");
    canvas.width = Math.floor(scaled.width);
    canvas.height = Math.floor(scaled.height);

    await page.render({ canvasContext: context, viewport: scaled }).promise;
  }
};

const initPdfPreview = async (container) => {
  const pdfFile = container.getAttribute("data-pdf");
  if (!pdfFile || !window.pdfjsLib) {
    return;
  }

  try {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const loadingTask = window.pdfjsLib.getDocument(encodeURI(pdfFile));
    const pdf = await loadingTask.promise;

    const card = container.closest(".brochure-card");
    const select = card?.querySelector(".pdf-page-select");
    const button = card?.querySelector(".pdf-render-btn");

    if (select) {
      select.innerHTML = "";
      const maxPages = Math.min(pdf.numPages, 20);
      for (let page = 1; page <= maxPages; page += 1) {
        const option = document.createElement("option");
        option.value = String(page);
        option.textContent = `Page ${page}`;
        select.appendChild(option);
      }
    }

    const initial = Number.parseInt(container.getAttribute("data-pages")?.split(",")[0] || "1", 10);
    await renderPdfPages(pdf, container, initial);

    if (button && select) {
      button.addEventListener("click", async () => {
        const page = Number.parseInt(select.value, 10) || 1;
        await renderPdfPages(pdf, container, page);
      });
    }
  } catch (error) {
    drawPreviewFallback(container);
  }
};

document.querySelectorAll(".pdf-preview-grid").forEach((grid) => {
  initPdfPreview(grid);
});
