// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

class AdminAuth {
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  static isAdminLoggedIn() {
    const currentUser = this.getCurrentUser();

    return currentUser && currentUser.role === "admin";
  }

  static protectDashboard() {
    if (!this.isAdminLoggedIn()) {
      alert("Admin access only. Please login as admin to view bookings.");
      window.location.href = "login.html";
      return false;
    }

    return true;
  }

  static logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
  }
}

// ==========================================
// BOOKING DASHBOARD CLASS
// ==========================================

class BookingDashboard {
  constructor() {
    this.bookingList = document.getElementById("bookingList");
    this.clearBookingsBtn = document.getElementById("clearBookingsBtn");
    this.logoutBtn = document.getElementById("logoutBtn");

    this.totalBookingsEl = document.getElementById("totalBookings");
    this.totalGuestsEl = document.getElementById("totalGuests");
    this.totalRevenueEl = document.getElementById("totalRevenue");

    this.bookings = this.getBookings();
  }

  getBookings() {
    return JSON.parse(localStorage.getItem("almasiBookings")) || [];
  }

  saveBookings() {
    localStorage.setItem("almasiBookings", JSON.stringify(this.bookings));
  }

  formatCurrency(amount) {
    return `Ksh ${Number(amount).toLocaleString()}`;
  }

  calculateTotalGuests() {
    return this.bookings.reduce((total, booking) => {
      return total + Number(booking.guestCount || 0);
    }, 0);
  }

  calculateTotalRevenue() {
    return this.bookings.reduce((total, booking) => {
      return total + Number(booking.totalCost || 0);
    }, 0);
  }

  updateStats() {
    this.totalBookingsEl.textContent = this.bookings.length;
    this.totalGuestsEl.textContent = this.calculateTotalGuests();
    this.totalRevenueEl.textContent = this.formatCurrency(this.calculateTotalRevenue());
  }

  renderEmptyState() {
    this.bookingList.innerHTML = `
      <div class="empty-bookings">
        <i class="fa-solid fa-calendar-xmark"></i>
        <h3>No bookings yet</h3>
        <p>
          Room bookings will appear here after a customer confirms a reservation.
        </p>
        <a href="rooms.html" class="btn btn-primary">Add Test Booking</a>
      </div>
    `;
  }

  renderBookings() {
    this.bookingList.innerHTML = "";

    if (this.bookings.length === 0) {
      this.renderEmptyState();
      this.updateStats();
      return;
    }

    this.bookings.forEach((booking) => {
      const bookingCard = document.createElement("article");
      bookingCard.classList.add("booking-card");

      bookingCard.innerHTML = `
        <div class="booking-card-header">
          <div>
            <span class="booking-label">Room Reservation</span>
            <h3>${booking.roomName}</h3>
          </div>

          <span class="booking-id">BK-${booking.id}</span>
        </div>

        <div class="booking-card-body">
          <p>
            <i class="fa-solid fa-user"></i>
            <strong>Guest:</strong> ${booking.guestName}
          </p>

          <p>
            <i class="fa-solid fa-phone"></i>
            <strong>Phone:</strong> ${booking.guestPhone}
          </p>

          <p>
            <i class="fa-solid fa-calendar-check"></i>
            <strong>Check-in:</strong> ${booking.checkInDate}
          </p>

          <p>
            <i class="fa-solid fa-calendar-xmark"></i>
            <strong>Check-out:</strong> ${booking.checkOutDate}
          </p>

          <p>
            <i class="fa-solid fa-users"></i>
            <strong>Guests:</strong> ${booking.guestCount}
          </p>

          <p>
            <i class="fa-solid fa-moon"></i>
            <strong>Nights:</strong> ${booking.nights}
          </p>
        </div>

        <div class="booking-card-footer">
          <span>Total Amount</span>
          <strong>${this.formatCurrency(booking.totalCost)}</strong>
        </div>
      `;

      this.bookingList.appendChild(bookingCard);
    });

    this.updateStats();
  }

  clearBookings() {
    const confirmClear = confirm(
      "Are you sure you want to clear all booking records?"
    );

    if (!confirmClear) return;

    localStorage.removeItem("almasiBookings");
    this.bookings = [];

    this.renderBookings();
  }

  init() {
    this.renderBookings();

    this.clearBookingsBtn.addEventListener("click", () => {
      this.clearBookings();
    });

    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", () => {
        AdminAuth.logout();
      });
    }
  }
}

// ==========================================
// INITIAL PAGE LOAD
// ==========================================

if (AdminAuth.protectDashboard()) {
  const bookingDashboard = new BookingDashboard();
  bookingDashboard.init();
}