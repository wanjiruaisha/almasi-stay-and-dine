function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function calculateTotalItems(cart) {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

function calculateNights(checkInDate, checkOutDate) {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const difference = checkOut - checkIn;

  return difference / (1000 * 60 * 60 * 24);
}

function calculateStayCost(roomPrice, nights) {
  return roomPrice * nights;
}

function isValidPassword(password) {
  return password.length >= 6;
}

function doPasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

module.exports = {
  calculateCartTotal,
  calculateTotalItems,
  calculateNights,
  calculateStayCost,
  isValidPassword,
  doPasswordsMatch
};