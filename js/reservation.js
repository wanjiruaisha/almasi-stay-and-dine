const homeReservationForm = document.getElementById("homeReservationForm");
const nameInput = document.getElementById("name");
const reservationTypeInput = document.getElementById("reservation-type");
const dateInput = document.getElementById("date");
const guestsInput = document.getElementById("guests");
const notesInput = document.getElementById("notes");

homeReservationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const reservationType = reservationTypeInput.value;
  const date = dateInput.value;
  const guests = guestsInput.value;
  const notes = notesInput.value.trim();

  if (!name || !date || !guests) {
    alert("Please fill in your name, date, and number of guests.");
    return;
  }

  const message =
    `Hello Almasi Stay & Dine, I would like to make a reservation.%0A%0A` +
    `Name: ${name}%0A` +
    `Reservation Type: ${reservationType}%0A` +
    `Preferred Date: ${date}%0A` +
    `Number of Guests: ${guests}%0A` +
    `Notes: ${notes || "None"}`;

  window.open(`https://wa.me/254713968080?text=${message}`, "_blank");

  homeReservationForm.reset();
});