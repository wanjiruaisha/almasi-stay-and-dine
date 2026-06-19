// ==========================================
// THEME MANAGER CLASS
// ==========================================

class ThemeManager {
  constructor(toggleButtonId) {
    this.toggleButton = document.getElementById(toggleButtonId);
    this.themeKey = "almasiTheme";
  }

  getSavedTheme() {
    return localStorage.getItem(this.themeKey);
  }

  saveTheme(theme) {
    localStorage.setItem(this.themeKey, theme);
  }

  applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }

  toggleTheme() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const newTheme = isDarkMode ? "light" : "dark";

    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }

  init() {
    const savedTheme = this.getSavedTheme() || "light";

    this.applyTheme(savedTheme);

    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  }
}

const themeManager = new ThemeManager("themeToggle");
themeManager.init();