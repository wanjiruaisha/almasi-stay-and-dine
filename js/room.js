// ==========================================
// ELEMENT SELECTORS
// ==========================================

const bookingForm = document.getElementById("bookingForm");
const guestNameInput = document.getElementById("guestName");
const guestPhoneInput = document.getElementById("guestPhone");
const roomTypeInput = document.getElementById("roomType");
const checkInDateInput = document.getElementById("checkInDate");
const checkOutDateInput = document.getElementById("checkOutDate");
const guestCountInput = document.getElementById("guestCount");
const bookingMessage = document.getElementById("bookingMessage");
const bookingList = document.getElementById("bookingList");

// ==========================================
// APPLICATION STATE
// ==========================================

let bookings = JSON.parse(localStorage.getItem("almasiBookings")) || [];

// ==========================================
// BOOKING CALCULATIONS
// ==========================================

function calculateNights(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const difference = checkOut - checkIn;

  return difference / (1000 * 60 * 60 * 24);
}

function calculateStayCost(roomPrice, nights) {
  return roomPrice * nights;
}

// ==========================================
// LOCAL STORAGE
// ==========================================

function saveBookings() {
  localStorage.setItem("almasiBookings", JSON.stringify(bookings));
}

// ==========================================
// BOOKING DISPLAY
// ==========================================

function renderBookings() {
    if (!bookingList) return;
  bookingList.innerHTML = "";

  if (bookings.length === 0) {
    bookingList.innerHTML = "<p>No room bookings yet.</p>";
    return;
  }

  bookings.forEach((booking) => {
    const bookingCard = document.createElement("div");
    bookingCard.classList.add("booking-card");

    bookingCard.innerHTML = `
      <h3>${booking.roomName}</h3>
      <p><strong>Guest:</strong> ${booking.guestName}</p>
      <p><strong>Phone:</strong> ${booking.guestPhone}</p>
      <p><strong>Check-in:</strong> ${booking.checkInDate}</p>
      <p><strong>Check-out:</strong> ${booking.checkOutDate}</p>
      <p><strong>Guests:</strong> ${booking.guestCount}</p>
      <p><strong>Nights:</strong> ${booking.nights}</p>
      <p><strong>Total:</strong> Ksh ${booking.totalCost}</p>
    `;

    bookingList.appendChild(bookingCard);
  });
}

// ==========================================
// FORM HANDLING
// ==========================================

function createBooking(event) {
  event.preventDefault();

  const guestName = guestNameInput.value.trim();
  const guestPhone = guestPhoneInput.value.trim();
  const selectedOption = roomTypeInput.options[roomTypeInput.selectedIndex];
  const roomName = selectedOption.textContent.split(" - ")[0];
  const roomPrice = Number(selectedOption.dataset.price);
  const checkInDate = checkInDateInput.value;
  const checkOutDate = checkOutDateInput.value;
  const guestCount = Number(guestCountInput.value);

  const nights = calculateNights(checkInDate, checkOutDate);

  if (!guestName || !guestPhone || !roomTypeInput.value || !checkInDate || !checkOutDate || guestCount < 1) {
    bookingMessage.textContent = "Please fill in all booking details correctly.";
    bookingMessage.classList.add("error-message");
    return;
  }

  if (nights <= 0) {
    bookingMessage.textContent = "Check-out date must be after check-in date.";
    bookingMessage.classList.add("error-message");
    return;
  }

  const booking = {
    id: Date.now(),
    guestName,
    guestPhone,
    roomName,
    roomPrice,
    checkInDate,
    checkOutDate,
    guestCount,
    nights,
    totalCost: calculateStayCost(roomPrice, nights)
  };

  bookings.push(booking);
  saveBookings();
  renderBookings();

  bookingMessage.textContent = "Booking confirmed successfully.";
  bookingMessage.classList.remove("error-message");

  bookingForm.reset();
}
// ==========================================
// ADMIN BOOKING LINK VISIBILITY
// ==========================================

function showAdminBookingsLink() {
  const adminBookingsLink = document.getElementById("adminBookingsLink");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!adminBookingsLink) return;

  if (currentUser && currentUser.role === "admin") {
    adminBookingsLink.classList.remove("hidden");
  }
}

showAdminBookingsLink();
// ==========================================
// EVENT LISTENERS
// ==========================================

bookingForm.addEventListener("submit", createBooking);

// ==========================================
// INITIAL PAGE LOAD
// ==========================================

renderBookings();