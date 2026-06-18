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
// ACCOUNT VALIDATION
// ==========================================

function createAccount(event) {
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

  if (password.length < 6) {
    accountMessage.textContent = "Password must be at least 6 characters long.";
    accountMessage.className = "auth-message error-message";
    return;
  }

  if (password !== confirmPassword) {
    accountMessage.textContent = "Passwords do not match.";
    accountMessage.className = "auth-message error-message";
    return;
  }

  const user = {
    fullName,
    email,
    phone,
    password
  };

  localStorage.setItem("almasiUser", JSON.stringify(user));

  accountMessage.textContent = "Account created successfully. You can now log in.";
  accountMessage.className = "auth-message success-message";

  createAccountForm.reset();
}

// ==========================================
// EVENT LISTENER
// ==========================================

createAccountForm.addEventListener("submit", createAccount);