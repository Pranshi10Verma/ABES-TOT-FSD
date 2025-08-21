(function () {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // Get preferred theme: saved -> system -> light
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    btn?.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    btn?.querySelector(".label")?.replaceChildren(document.createTextNode(theme === "dark" ? "Light Mode" : "Dark Mode"));
    // Match browser UI color on mobile
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#0b1220" : "#ffffff");
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Init
  applyTheme(getPreferredTheme());

  // Listen to OS theme changes (if user hasn't manually set)
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener?.("change", () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(getPreferredTheme());
    }
  });

  // Button interactions
  btn?.addEventListener("click", toggleTheme);

  // Keyboard shortcut: press "D" or "d"
  window.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "D") {
      e.preventDefault();
      toggleTheme();
    }
  });
})();
