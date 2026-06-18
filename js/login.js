// ==========================================
// ELEMENT SELECTORS
// ==========================================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

// ==========================================
// LOGIN VALIDATION
// ==========================================

function loginUser(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const storedUser = JSON.parse(localStorage.getItem("almasiUser"));

  if (!storedUser) {
    loginMessage.textContent = "No account found. Please create an account first.";
    loginMessage.className = "auth-message error-message";
    return;
  }

  if (email !== storedUser.email || password !== storedUser.password) {
    loginMessage.textContent = "Invalid email or password.";
    loginMessage.className = "auth-message error-message";
    return;
  }

  localStorage.setItem("isLoggedIn", "true");

  loginMessage.textContent = `Welcome back, ${storedUser.fullName}!`;
  loginMessage.className = "auth-message success-message";

  loginForm.reset();
}

// ==========================================
// EVENT LISTENER
// ==========================================

loginForm.addEventListener("submit", loginUser);