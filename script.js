const items = document.querySelectorAll(".accordion-item");

items.forEach((item) => {
  const trigger = item.querySelector(".accordion-trigger");
  const panel = item.querySelector(".accordion-panel");

  if (!trigger || !panel) return;

  const syncPanel = () => {
    panel.style.maxHeight = item.classList.contains("is-open") ? `${panel.scrollHeight}px` : "0px";
  };

  syncPanel();

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
    trigger.querySelector(".plus").textContent = isOpen ? "-" : "+";
    syncPanel();
  });

  window.addEventListener("resize", syncPanel);
});

const DESKTOP_UNICORN_PROJECT = "Of6T39qynUrG1BMqs26P";
const MOBILE_UNICORN_PROJECT = "kbXVpMbQxAnRFCPhEsHO";

const prepareUnicornScene = () => {
  const scene = document.getElementById("unicorn-scene");
  if (!scene) return;

  const isMobile = window.matchMedia("(max-width: 560px)").matches;
  scene.dataset.usProject = isMobile ? MOBILE_UNICORN_PROJECT : DESKTOP_UNICORN_PROJECT;
};

const keepForegroundVisible = () => {
  const setStyle = (element, property, value) => {
    if (element.style[property] !== value) element.style[property] = value;
  };

  const foreground = [
    document.querySelector(".page-shell"),
    document.querySelector(".site-header"),
    document.querySelector(".main-content"),
    document.querySelector(".logo-ticker"),
    document.querySelector(".site-footer"),
  ].filter(Boolean);

  foreground.forEach((element) => {
    setStyle(element, "opacity", "1");
    setStyle(element, "visibility", "visible");
  });

  const shell = document.querySelector(".page-shell");
  if (shell) {
    setStyle(shell, "position", "relative");
    setStyle(shell, "zIndex", "20");
  }

  document.querySelectorAll(".unicorn-background, .unicorn-background *").forEach((element) => {
    setStyle(element, "pointerEvents", "none");
    setStyle(element, "zIndex", "0");
  });
};

const startForegroundWatchdog = () => {
  keepForegroundVisible();

  let ticks = 0;
  const interval = window.setInterval(() => {
    keepForegroundVisible();
    ticks += 1;
    if (ticks > 30) window.clearInterval(interval);
  }, 500);

  const observer = new MutationObserver(keepForegroundVisible);
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["style", "class"],
  });

  window.setTimeout(() => observer.disconnect(), 20000);
};

const loadUnicornStudio = () => {
  prepareUnicornScene();
  startForegroundWatchdog();

  const existing = window.UnicornStudio;

  if (existing?.init) {
    existing.init();
    return;
  }

  window.UnicornStudio = { isInitialized: false };

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.6/dist/unicornStudio.umd.js";
  script.onload = () => window.UnicornStudio?.init?.();
  (document.head || document.body).appendChild(script);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadUnicornStudio);
} else {
  loadUnicornStudio();
}
