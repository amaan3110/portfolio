(function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });
})();

gsap.registerPlugin(ScrollTrigger);

CustomEase.create("customEase", "0.16,1,0.3,1");

const words = document.querySelectorAll(".loader_greeting span");
const tl = gsap.timeline();

words.forEach((word) => {
  tl.to(word, {
    display: "block",
    duration: 0.1,
  }).to(
    word,
    {
      display: "none",
      duration: 0.1,
      onComplete: () => {
        gsap.to(".loader_text", { opacity: 1 });
      },
    },
    "+=0.2",
  );
});
tl.from(".loader h1", {
  x: 80,
  opacity: 0,
  duraion: 1,
  ease: "power1.inOut",
})
  .from(".name", {
    height: 0,
    transformOrigin: "top",
    duration: 0.5,
    ease: "power2.out",
  })
  .to(".loader h1", {
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.3,
  })
  .to(
    ".loader",
    {
      height: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.5",
  )
  .to(
    ".loader_2",
    {
      height: 0,
      duration: 1,
      ease: "customEase",
      onComplete: () => {
        document.querySelector(".loader-container").remove();
      },
    },
    "-=0.7",
  );

function projectCards({ year, type, name, link }) {
  return `<div class="projects_card">
            <div class="project_type">${type} <br/> <span class="font-freight fw-600">${year}</span></div>
            <div class="project_name">${name}</div>
            <div class="project_link">
              <a href=${link} target="_blank">
                <i class="ri-arrow-right-long-line"></i>
              </a>
            </div>
          </div>`;
}

const projectArray = [
  {
    year: 2025,
    type: "Company Project",
    name: "GrowSkills",
    link: "https://growskills.alignbooks.com/",
  },
  {
    year: 2025,
    type: "Company Project",
    name: "Learn with AlignBooks",
    link: "https://learn.alignbooks.com/",
  },
  {
    year: 2024,
    type: "Company Project",
    name: "AlignBooks",
    link: "https://alignbooks.com/",
  },
  {
    year: 2024,
    type: "Spring Initializr",
    name: "Node Initializer",
    link: "https://node-initializer.onrender.com/",
  },
  {
    year: 2024,
    type: "Uber Inspired",
    name: "Cabixx",
    link: "https://frontend-oiji.onrender.com/",
  },
  {
    year: 2024,
    type: "AI Code Reviewer",
    name: "Code Reviewer",
    link: "https://codereviewer.onrender.com",
  },
  {
    year: 2023,
    type: "E-Commerce",
    name: "Scatch",
    link: "https://scatch.onrender.com",
  },
  {
    year: 2023,
    type: "Development Studio",
    name: "Zajno",
    link: "https://amaan3110.github.io/animated-websites/",
  },
  {
    year: 2022,
    type: "Presentation Agency",
    name: "Ochi Design",
    link: "https://amaan3110.github.io/animated-websites/",
  },
  {
    year: 2022,
    type: "Design Agency",
    name: "Rejouice",
    link: "https://amaan3110.github.io/animated-websites/",
  },
];

projectArray.forEach((project) => {
  document.getElementById("projects").innerHTML += projectCards(project);
});

let lastScrollY = window.scrollY;
let isScrollingDown = false;

let ticking = false;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (currentScroll > lastScrollY && !isScrollingDown) {
        // Scrolling down
        gsap.to("nav", {
          y: -100,
          duration: 0.5,
          ease: "power2.out",
        });
        isScrollingDown = true;
      } else if (currentScroll < lastScrollY && isScrollingDown) {
        // Scrolling up
        gsap.to("nav", {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        isScrollingDown = false;
      }

      lastScrollY = currentScroll;
      ticking = false;
    });

    ticking = true;
  }
});

function scrollMarquee() {
  const scrollInner = document.querySelector(".scroll_inner");
  const scrollMarquee = document.querySelector(".scroll_marquee");

  let lastScrollY = window.scrollY;
  let offsetX = 0;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    const rect = scrollMarquee.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      offsetX += delta * 1;

      gsap.to(scrollInner, {
        x: -offsetX,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    lastScrollY = currentScrollY;
  });
}
scrollMarquee();

function updateTime() {
  const now = new Date();

  // Get hours and minutes
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Get timezone offset in minutes
  const offsetMin = now.getTimezoneOffset(); // e.g., -330 for +5:30
  const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
  const offsetMinutes = Math.abs(offsetMin) % 60;
  const sign = offsetMin <= 0 ? "+" : "-";

  const formattedOffset = `${sign}${offsetHours}:${offsetMinutes
    .toString()
    .padStart(2, "0")}`;

  const formattedTime = `${hours}:${minutes}:${seconds} GMT (${formattedOffset})`;

  document.getElementById("timeDisplay").innerHTML =
    "My Local Time<br/>" + formattedTime;
}
updateTime();
setInterval(updateTime, 1000);

document.querySelectorAll(".page5_body span").forEach((span) => {
  span.addEventListener("click", (e) => {
    const url = e.target.dataset.url;
    window.open(url, "_blank");
  });
});

gsap.from(".skill_container > img", {
  x: "100%",
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".skill_container",
    start: "top 70%",
    end: "bottom 80%",
  },
});

document.getElementById("checkbox").addEventListener("change", (e) => {
  const [firstH2, secondH2] = document.querySelectorAll(".about_me h2");

  const showFirst = !checkbox.checked;

  gsap.to(firstH2, {
    opacity: showFirst ? 1 : 0,
    duration: 0.5,
    ease: "power2.inOut",
  });

  gsap.to(secondH2, {
    opacity: showFirst ? 0 : 1,
    duration: 0.5,
    ease: "power2.inOut",
  });
});

function redirectTo(url) {
  window.open(url, "_blank");
}

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

function redirectToNew() {
  const { utm_source, utm_medium, visitor_id } = getUTMParams();

  const newSource = utm_source ? `${utm_source}_old` : "direct_old";
  const newMedium = utm_medium ? `${utm_medium}_old` : "none_old";

  const url = new URL("https://amaan3110.github.io/portfolio/");

  url.searchParams.set("utm_source", newSource);
  url.searchParams.set("utm_medium", newMedium);
  url.searchParams.set("visitor_id", visitor_id);

  window.open(url.toString(), "_blank");
}

function openResume() {
  window.open(
    `https://ik.imagekit.io/webdev567/Amaan_Resume.pdf?v=${Date.now()}`,
    "_blank",
  );
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
  const match = document.cookie.match(/visitor_id=([^;]+)/);
  if (match) return match[1];

  const params = new URLSearchParams(window.location.search);
  let id = "";
  if (params.has("visitor_id")) {
    id = params.get("visitor_id");
  } else {
    id = crypto.randomUUID();
  }

  document.cookie = `visitor_id=${id}; path=/; max-age=31536000; SameSite=Lax`;
  return id;
}

function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    device: getDeviceType() || "",
    timestamp: getFormattedTimestamp(),
    visitor_id: getVisitorId(),
  };
}

(async () => {
  if (sessionStorage.getItem("utmDataSent_v1")) {
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
      sessionStorage.setItem("utmDataSent_v1", "true");
    } catch (error) {
      console.error("❌ Error sending UTM data:", error);
    }
  }
})();
