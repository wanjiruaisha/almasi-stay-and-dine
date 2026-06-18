// ==========================================
// AUTHENTICATION SERVICE CLASS
// ==========================================

class AuthService {
  static getUser() {
    return JSON.parse(localStorage.getItem("almasiUser"));
  }

  static login(email, password) {
    const storedUser = this.getUser();

    if (!storedUser) {
      return {
        success: false,
        message: "No account found. Please create an account first."
      };
    }

    if (email !== storedUser.email || password !== storedUser.password) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    localStorage.setItem("isLoggedIn", "true");

    return {
      success: true,
      message: `Welcome back, ${storedUser.fullName}!`
    };
  }
}

// ==========================================
// ELEMENT SELECTORS
// ==========================================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

// ==========================================
// FORM HANDLING
// ==========================================

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const result = AuthService.login(email, password);

  loginMessage.textContent = result.message;
  loginMessage.className = result.success
    ? "auth-message success-message"
    : "auth-message error-message";

  if (result.success) {
    loginForm.reset();
  }
});