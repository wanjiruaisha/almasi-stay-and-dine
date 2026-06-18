// ==========================================
// USER CLASS
// ==========================================

class User {
  constructor(fullName, email, phone, password) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}

// ==========================================
// AUTHENTICATION SERVICE CLASS
// ==========================================

class AuthService {
  static saveUser(user) {
    localStorage.setItem("almasiUser", JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(localStorage.getItem("almasiUser"));
  }

  static isValidPassword(password) {
    return password.length >= 6;
  }

  static doPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }
}

// ==========================================
// ELEMENT SELECTORS
// ==========================================

const createAccountForm = document.getElementById("createAccountForm");
const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const accountMessage = document.getElementById("accountMessage");

// ==========================================
// FORM HANDLING
// ==========================================

createAccountForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!fullName || !email || !password || !confirmPassword) {
    accountMessage.textContent = "Please fill in all required fields.";
    accountMessage.className = "auth-message error-message";
    return;
  }

  if (!AuthService.isValidPassword(password)) {
    accountMessage.textContent = "Password must be at least 6 characters long.";
    accountMessage.className = "auth-message error-message";
    return;
  }

  if (!AuthService.doPasswordsMatch(password, confirmPassword)) {
    accountMessage.textContent = "Passwords do not match.";
    accountMessage.className = "auth-message error-message";
    return;
  }

  const newUser = new User(fullName, email, phone, password);

  AuthService.saveUser(newUser);

  accountMessage.textContent = "Account created successfully. You can now log in.";
  accountMessage.className = "auth-message success-message";

  createAccountForm.reset();
});