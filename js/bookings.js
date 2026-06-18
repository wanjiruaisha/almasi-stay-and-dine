// ==========================================
// ELEMENT SELECTORS
// ==========================================

const bookingList = document.getElementById("bookingList");
const clearBookingsBtn = document.getElementById("clearBookingsBtn");

// ==========================================
// APPLICATION STATE
// ==========================================

let bookings = JSON.parse(localStorage.getItem("almasiBookings")) || [];

// ==========================================
// BOOKING DISPLAY
// ==========================================

function renderBookings() {
  bookingList.innerHTML = "";

  if (bookings.length === 0) {
    bookingList.innerHTML = `
      <div class="empty-bookings">
        <h3>No bookings yet</h3>
        <p>Room bookings will appear here after a customer confirms a reservation.</p>
      </div>
    `;
    return;
  }

  bookings.forEach((booking) => {
    const bookingCard = document.createElement("article");
    bookingCard.classList.add("booking-card");

    bookingCard.innerHTML = `
      <div class="booking-card-header">
        <h3>${booking.roomName}</h3>
        <span>Booking #${booking.id}</span>
      </div>

      <div class="booking-card-body">
        <p><strong>Guest:</strong> ${booking.guestName}</p>
        <p><strong>Phone:</strong> ${booking.guestPhone}</p>
        <p><strong>Check-in:</strong> ${booking.checkInDate}</p>
        <p><strong>Check-out:</strong> ${booking.checkOutDate}</p>
        <p><strong>Guests:</strong> ${booking.guestCount}</p>
        <p><strong>Nights:</strong> ${booking.nights}</p>
      </div>

      <div class="booking-card-footer">
        <strong>Total: Ksh ${booking.totalCost}</strong>
      </div>
    `;

    bookingList.appendChild(bookingCard);
  });
}

// ==========================================
// CLEAR BOOKINGS
// ==========================================

clearBookingsBtn.addEventListener("click", () => {
  localStorage.removeItem("almasiBookings");
  bookings = [];
  renderBookings();
});

// ==========================================
// INITIAL PAGE LOAD
// ==========================================

renderBookings();