// ==========================================
// ADMIN ACCOUNT DETAILS
// ==========================================

const ADMIN_EMAIL = "admin@almasi.com";
const ADMIN_PASSWORD = "admin123";

// ==========================================
// AUTHENTICATION SERVICE CLASS
// ==========================================

class AuthService {
  static getUser() {
    return JSON.parse(localStorage.getItem("almasiUser"));
  }

  static saveCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
  }

  static login(email, password) {
    // Admin login check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        fullName: "System Admin",
        email: ADMIN_EMAIL,
        role: "admin"
      };

      this.saveCurrentUser(adminUser);

      return {
        success: true,
        role: "admin",
        message: "Welcome back, System Admin!"
      };
    }

    // Customer login check
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

    const customerUser = {
      fullName: storedUser.fullName,
      email: storedUser.email,
      phone: storedUser.phone,
      role: "customer"
    };

    this.saveCurrentUser(customerUser);

    return {
      success: true,
      role: "customer",
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

    setTimeout(() => {
      if (result.role === "admin") {
        window.location.href = "bookings.html";
      } else {
        window.location.href = "index.html";
      }
    }, 800);
  }
});