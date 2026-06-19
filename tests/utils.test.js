const {
  calculateCartTotal,
  calculateTotalItems,
  calculateNights,
  calculateStayCost,
  isValidPassword,
  doPasswordsMatch
} = require("../js/utils");

describe("Cart utility functions", () => {
  test("calculates total cart amount", () => {
    const cart = [
      { name: "Pilau", price: 300, quantity: 2 },
      { name: "Biryani", price: 450, quantity: 1 }
    ];

    expect(calculateCartTotal(cart)).toBe(1050);
  });

  test("calculates total cart items", () => {
    const cart = [
      { name: "Fresh Juice", price: 150, quantity: 2 },
      { name: "Soda", price: 80, quantity: 3 }
    ];

    expect(calculateTotalItems(cart)).toBe(5);
  });
});

describe("Room booking utility functions", () => {
  test("calculates number of nights", () => {
    expect(calculateNights("2026-06-20", "2026-06-23")).toBe(3);
  });

  test("calculates total stay cost", () => {
    expect(calculateStayCost(2500, 2)).toBe(5000);
  });
});

describe("Authentication utility functions", () => {
  test("validates password length", () => {
    expect(isValidPassword("secret123")).toBe(true);
    expect(isValidPassword("123")).toBe(false);
  });

  test("checks if passwords match", () => {
    expect(doPasswordsMatch("pass123", "pass123")).toBe(true);
    expect(doPasswordsMatch("pass123", "wrong123")).toBe(false);
  });
});