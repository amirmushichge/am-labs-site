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

const loadUnicornStudio = () => {
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
