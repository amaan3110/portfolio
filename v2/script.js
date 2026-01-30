(function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    lerp: 0.1,
  });
})();

gsap.registerPlugin(ScrollTrigger);

const hero_text = document.querySelector(".my_name h1");
const star_img = document.querySelector(".star_img");
const hero_text_container = document.querySelector(".my_name");
const loader_text = document.querySelector(".greeting_text");
let index = 0;

const greetings = ["Hello", "नमस्ते", "Bonjour", "Hola", "こんにちは", "سلام"];

const tl = gsap.timeline({ ease: "power2.inOut" });

const isMobile = window.innerWidth < 600;
const isTablet = window.innerWidth < 780;

gsap.set(hero_text, {
  clipPath: "inset(0 100% 0 0)",
});

// gsap.set(hero_text_container, {
//   y: window.innerHeight / 2 - hero_text_container.offsetHeight,
// });

tl.from(star_img, {
  y: "100%",
  opacity: 0,
  duration: 1,
})
  .to(star_img, {
    x: -hero_text.offsetWidth,
    rotation: -90,
    duration: 1,
  })
  .to(star_img, {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 1,
  })
  .to(
    hero_text,
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1,
    },
    "<",
  )
  .to(
    hero_text_container,
    {
      x: isTablet ? 15 : 0,
    },
    "<",
  )
  .to(star_img, {
    height: isMobile ? 30 : 40,
    x: -20,
    y: isMobile ? -20 : -25,
    rotate: -180,
    duration: 1,
  })
  .to(hero_text_container, {
    y: 0,
    duration: 1,
  })
  .to(
    ".loader_screen",
    {
      background: "transparent",
      duartion: 1,
    },
    "<",
  )
  .from(
    "header",
    {
      y: -20,
      opacity: 0,
      duration: 1,
    },
    "<",
  )
  .to(
    "header",
    {
      zIndex: 99,
    },
    "<",
  )
  .to(".hero_text_img", {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      document.querySelector(".loader_screen")?.remove();
    },
  });

// Header Animation
(function scrollHeader() {
  let lastY = window.scrollY;
  let hidden = false;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > lastY && !hidden) {
      gsap.to("header", { y: -100, duration: 0.5, ease: "power2.out" });
      hidden = true;
    }

    if (y < lastY && hidden) {
      gsap.to("header", { y: 0, duration: 0.5, ease: "power2.out" });
      hidden = false;
    }

    lastY = y;
  });
})();

// Image Error Handeling
function onImageError(img) {
  const fallback = img.dataset.fallback;

  if (!fallback) return;

  img.onerror = null;
  img.src = fallback;
}

// Open Resume in New Tab
function openResume() {
  window.open(
    `https://ik.imagekit.io/webdev567/Amaan_Resume.pdf?v=${Date.now()}`,
    "_blank",
  );
}

// Hero Section Animation
function placeHeroTextImages() {
  const wrapper = document.querySelector(".my_name");
  if (!wrapper) return;

  const h1 = wrapper.querySelector("h1");
  const img1 = wrapper.querySelector(".hero_text1");
  const img2 = wrapper.querySelector(".hero_text2");

  if (!h1 || !img1 || !img2) return;

  const gap = 16; // spacing between h1 and images

  const wrapRect = wrapper.getBoundingClientRect();
  const h1Rect = h1.getBoundingClientRect();

  const h1Left = h1Rect.left - wrapRect.left;
  const h1Right = h1Left + h1Rect.width;

  img1.style.top = `0px`;
  img2.style.bottom = `0px`;
  img2.style.top = "auto";

  img1.style.left = isTablet ? "auto" : `${h1Left - img1.offsetWidth + 10}px`;

  img2.style.left = isMobile ? "auto" : `${h1Right + gap}px`;
}
window.addEventListener("load", placeHeroTextImages);
window.addEventListener("resize", placeHeroTextImages);
document.querySelectorAll(".hero_text_img").forEach((img) => {
  img.addEventListener("load", placeHeroTextImages);
});
if (document.fonts) {
  document.fonts.ready.then(placeHeroTextImages);
}

// Update Time
function updateTime() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  document.getElementById("timeDisplay").innerHTML =
    `My Local Time<br/>${time} IST (Asia/Kolkata)`;
}
updateTime();
setInterval(updateTime, 1000);

// Hero Section Grid
const hero_grid = document.querySelector(".hero_grid");
function createGrid() {
  hero_grid.innerHTML = "";

  const size = 60;

  if (!hero_grid) return;

  const { width, height } = hero_grid.getBoundingClientRect();

  const cols = Math.floor(width / size);
  const rows = Math.floor(height / size);
  const totalCells = cols * rows;
  const half = Math.ceil(cols / 2);

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";

    const colIndex = i % cols;

    cell.dataset.col = colIndex;
    cell.dataset.side = colIndex < half ? "left" : "right";

    hero_grid.appendChild(cell);
  }
}

createGrid();
window.addEventListener("resize", () => {
  createGrid();
});

// Work Section Animation
const track = document.querySelector(".works_track");
const extraScroll = isMobile ? 75 : 150;
const startPos = isTablet ? "top" : "-=150";
gsap.to(track, {
  x: () => track.offsetWidth - track.scrollWidth - extraScroll,
  ease: "none",
  scrollTrigger: {
    trigger: ".section-works",
    start: `top ${startPos}`,
    end: () => `+=${track.scrollWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
});

// Slider Text Animation
const text_wrapper = document.querySelector(".text_wrapper");
let text_height = isMobile ? 120 : 60;
(function slideTextAnimation() {
  text_wrapper.style.transition = `transform 600ms ease`;
  text_wrapper.style.transform = `translateY(-${text_height}px)`;

  setTimeout(() => {
    text_wrapper.appendChild(text_wrapper.firstElementChild);
    text_wrapper.style.transition = "none";
    text_wrapper.style.transform = "translateY(0)";

    setTimeout(slideTextAnimation, 1400);
  }, 600);
})();

(function applyRandomBgColor() {
  const colors = ["--secondary", "--red", "--blue", "--yellow"];

  const randomVar = colors[Math.floor(Math.random() * colors.length)];

  const root = document.documentElement;
  const randomColor = getComputedStyle(root).getPropertyValue(randomVar).trim();

  document.querySelector(".animation_container").style.backgroundColor =
    randomColor;
})();

// Testimonials Section Animation (Printer Cards)
function printerCardsAnimation() {
  if (isTablet) return;
  const section = document.querySelector(".section-testimonials");
  const printerImg = document.querySelector(".printer_img");
  const cards = gsap.utils.toArray(".testimonial_card");

  const printerRect = printerImg.getBoundingClientRect();

  cards.forEach((card, i) => {
    const cardRect = card.getBoundingClientRect();

    const fromX =
      printerRect.left +
      printerRect.width / 2 -
      (cardRect.left + cardRect.width / 2);
    const fromY =
      printerRect.top +
      printerRect.height * 0.15 -
      (cardRect.top + cardRect.height / 2);

    gsap.from(card, {
      x: fromX,
      y: fromY,
      scale: 0.7,
      rotate: gsap.utils.random(-6, 6),
      duration: 1,
      ease: "power2.out",
      delay: i * 0.5,
      scrollTrigger: {
        trigger: section,
        start: "top 30%",
        toggleActions: "play none none none",
      },
    });
  });
}
printerCardsAnimation();

// Testimonials Section Animation (Testimonial Cards)
function placeTestimonialCards() {
  if (!isTablet) return;
  const cards = document.querySelectorAll(".testimonial_card");

  cards.forEach((card) => {
    card.style.rotate = "0deg";
    card.style.transform = "translateY(0px)";
    card.style.transition = "all 0.3s ease";
  });

  const center = Math.floor(cards.length / 2);
  const left = center - 1;
  const right = center + 1;

  const leftCard = cards[left];
  const rightCard = cards[right];

  if (leftCard) {
    leftCard.style.rotate = "-5deg";
    leftCard.style.transform = "translateY(30px)";
  }

  if (rightCard) {
    rightCard.style.rotate = "5deg";
    rightCard.style.transform = "translateY(30px)";
  }
}

placeTestimonialCards();

function moveTestimonialCards(direction) {
  const cards = document.querySelectorAll(".testimonial_card");
  const cards_container = document.querySelector(".testimonials");

  if (direction == "next") {
    cards_container.appendChild(cards[0]);
  } else if (direction == "prev") {
    cards_container.prepend(cards[cards.length - 1]);
  }

  placeTestimonialCards();
}

if (isTablet) {
  setInterval(() => moveTestimonialCards("next"), 5000);
}

// Live Timer (since job start date)
function startLiveTimer(startDateStr, elId) {
  const startDate = new Date(startDateStr); // "9/9/2024"

  if (!startDate) {
    console.error("❌ Invalid date format. Use like: '9/9/2024 10:30'");
    return;
  }

  const el = document.getElementById(elId);

  function update() {
    const now = new Date();
    let diff = now - startDate; // milliseconds

    if (diff < 0) diff = 0; // if start date is future

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(
      2,
      "0",
    );
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    el.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  return setInterval(update, 1000);
}
startLiveTimer("9/9/2024 9:55:32", "startDateDisplay");

// Old Portfolio Redirection

function redirectToOld() {
  const { utm_source, utm_medium } = getUTMParams();

  const newSource = utm_source ? `${utm_source}_new` : "direct_new";
  const newMedium = utm_medium ? `${utm_medium}_new` : "none_new";

  const url = new URL("https://amaan3110.github.io/portfolio/");

  url.searchParams.set("utm_source", newSource);
  url.searchParams.set("utm_medium", newMedium);

  window.open(url.toString(), "_blank");
}

// Contact Form
const contact_form = document.getElementById("story-form");
const closeBtn = document.getElementById("status_close");

contact_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = contact_form.name.value;
  const email = contact_form.email.value;
  const project = contact_form.project.value;
  const message = contact_form.message.value;

  const btn = contact_form.querySelector("button[type='submit']");

  // ✅ Loading ON
  btn.classList.add("loading");
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line btn-spinner"></i>';

  try {
    const response = await fetch("https://sheetdb.io/api/v1/d150xowibfx7o", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { name, email, project, message } }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.created === 1) {
      console.log("✅ Form data sent to SheetDB");
      contact_form.reset();

      showHideModal("show");

      setTimeout(() => {
        showHideModal("hide");
      }, 5000);
    } else {
      console.error("❌ Error sending form data");
    }
  } catch (error) {
    console.error("❌ Error sending form data:", error);
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
    btn.innerHTML = "git commit -m 'send'";
  }
});

closeBtn.addEventListener("click", () => {
  showHideModal("hide");
});

function showHideModal(type) {
  if (type == "show") {
    $("#contact_form_status").show();

    gsap.from(".status_modal", {
      y: 100,
      opacity: 0,
    });
  } else if (type == "hide") {
    gsap.to(".status_modal", {
      y: 100,
      opacity: 0,
    });

    setTimeout(() => {
      $("#contact_form_status").hide();
    }, 500);
  }
}

// UTM Param Functions

function getFormattedTimestamp() {
  const now = new Date();
  // Convert to IST: UTC + 5 hours 30 minutes
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);

  const year = istTime.getUTCFullYear();
  const month = String(istTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(istTime.getUTCDate()).padStart(2, "0");

  const hours = String(istTime.getUTCHours()).padStart(2, "0");
  const minutes = String(istTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istTime.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getDeviceType() {
  const width = window.innerWidth;

  if (width < 600) {
    return "Mobile";
  } else if (width <= 1024) {
    return "Tablet";
  } else {
    return "Desktop";
  }
}

function getVisitorId() {
  let id = localStorage.getItem("visitor_id");

  if (!id) {
    id = crypto.randomUUID(); // secure unique ID
    localStorage.setItem("visitor_id", id);
  }

  return id;
}

function getClubbedUAInfo() {
  const ua = navigator.userAgent;

  let device = "Unknown";
  let os = "Unknown";
  let osVersion = "";
  let browser = "Unknown";
  let browserVersion = "";

  // iPhone / iPad
  if (/iPhone|iPad|iPod/i.test(ua)) {
    device = /iPad/i.test(ua) ? "iPad" : "iPhone";
    os = "iOS";

    const iosMatch = ua.match(/OS (\d+[_\d]*)/);
    if (iosMatch) osVersion = iosMatch[1].replaceAll("_", ".");

    const safariMatch = ua.match(/Version\/([\d.]+)/);
    if (safariMatch) {
      browser = "Safari";
      browserVersion = safariMatch[1];
    }
  }
  // Android
  else if (/Android/i.test(ua)) {
    device = "Android";
    os = "Android";

    const androidMatch = ua.match(/Android ([\d.]+)/);
    if (androidMatch) osVersion = androidMatch[1];

    const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
    if (chromeMatch) {
      browser = "Chrome";
      browserVersion = chromeMatch[1];
    }
  }
  // Desktop
  else {
    device = "Desktop";

    if (/Windows/i.test(ua)) os = "Windows";
    else if (/Macintosh/i.test(ua)) os = "MacOS";
    else if (/Linux/i.test(ua)) os = "Linux";

    const edgeMatch = ua.match(/Edg\/([\d.]+)/);
    const chromeMatch = ua.match(/Chrome\/([\d.]+)/);
    const firefoxMatch = ua.match(/Firefox\/([\d.]+)/);

    if (edgeMatch) {
      browser = "Edge";
      browserVersion = edgeMatch[1];
    } else if (chromeMatch) {
      browser = "Chrome";
      browserVersion = chromeMatch[1];
    } else if (firefoxMatch) {
      browser = "Firefox";
      browserVersion = firefoxMatch[1];
    }
  }

  // ✅ clubbed string
  return `${device} | ${browser} ${browserVersion} | ${os} ${osVersion}`.trim();
}

function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    device: getDeviceType(),
    timestamp: getFormattedTimestamp(),
    visitor_id: getVisitorId(),
    user_agent: getClubbedUAInfo(),
  };
}

(async () => {
  if (sessionStorage.getItem("utmDataSent")) {
    return;
  }

  const utm = getUTMParams();

  try {
    const locationData = await fetch(
      "https://ipinfo.io/json?token=abec968d6caa8e",
    ).then((res) => res.json());
    utm.location = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
  } catch (err) {
    console.error("❌ Error fetching location:", err);
    utm.location = "Unknown";
  }

  if (utm.utm_source || utm.utm_medium) {
    try {
      await fetch("https://sheetdb.io/api/v1/01evwz914tipz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: utm }),
      });
      console.log("✅ UTM data sent to SheetDB");
      sessionStorage.setItem("utmDataSent", "true");
    } catch (error) {
      console.error("❌ Error sending UTM data:", error);
    }
  }
})();
