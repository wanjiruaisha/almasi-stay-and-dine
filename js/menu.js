// Menu data used to dynamically generate meal cards
const meals = [
  {
    id: 1,
    name: "Pilau",
    category: "main",
    price: 300,
    image: "assets/images/pilau.jpg",
    description: "Traditional spiced rice served with rich flavour and generous portions."
  },
  {
    id: 2,
    name: "Biryani",
    category: "main",
    price: 450,
    image: "assets/images/biryani.jpg",
    description: "Aromatic rice dish prepared with bold spices and a satisfying taste."
  },
  {
    id: 3,
    name: "Githeri",
    category: "traditional",
    price: 200,
    image: "assets/images/githeri.jpg",
    description: "A healthy traditional meal made with maize and beans."
  }
  {
  id: 4,
  name: "Ugali & Fish",
  category: "traditional",
  price: 500,
  image: "assets/images/ugali-fish.jpg",
  description: "Fresh fish served with ugali and vegetables for a filling meal."
},
{
  id: 5,
  name: "Chapati & Beef",
  category: "main",
  price: 350,
  image: "assets/images/chapati-beef.jpg",
  description: "Soft chapati served with rich beef stew and vegetables."
},
{
  id: 6,
  name: "Mukimo",
  category: "traditional",
  price: 300,
  image: "assets/images/mukimo.jpg",
  description: "A traditional mashed meal served with stew for a homely taste."
}
];
// Selecting elements from the HTML page
const menuContainer = document.getElementById("menuContainer");
const menuMessage = document.getElementById("menuMessage");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


let selectedCategory = "all";
let cart = [];

// Displays meal cards on the page
function renderMeals(mealsToRender) {
  menuContainer.innerHTML = "";

  if (mealsToRender.length === 0) {
    menuMessage.textContent = "No meals found.";
    return;
  }

  menuMessage.textContent = "";

  mealsToRender.forEach((meal) => {
    const mealCard = document.createElement("article");
    mealCard.classList.add("meal-card");

    mealCard.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}">

      <div>
        <h3>${meal.name}</h3>
        <p>${meal.description}</p>
        <strong>Ksh ${meal.price}</strong>

        <button class="btn btn-primary add-to-cart-btn" data-id="${meal.id}">
          Add to Cart
        </button>
      </div>
    `;

    menuContainer.appendChild(mealCard);
  });
}

renderMeals(meals);

//Adding search functionality and category filtering
function filterMeals() {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderMeals(filteredMeals);
}
// Search listener
searchInput.addEventListener("input", filterMeals);

//Category filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    filterMeals();
  });
});


//Adding basic cart logic
function addToCart(mealId) {
  const selectedMeal = meals.find((meal) => meal.id === mealId);
  const existingMeal = cart.find((item) => item.id === mealId);

  if (existingMeal) {
    existingMeal.quantity += 1;
  } else {
    cart.push({
      ...selectedMeal,
      quantity: 1
    });
  }

  renderCart();
}

function calculateCartTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>Ksh ${item.price} x ${item.quantity}</p>
      </div>
      <div class="cart-actions">
        <button data-id="${item.id}" class="decrease-btn">-</button>
        <span>${item.quantity}</span>
        <button data-id="${item.id}" class="increase-btn">+</button>
        <button data-id="${item.id}" class="remove-btn">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = calculateCartTotal();
}


renderCart();


function increaseQuantity(mealId) {
  const item = cart.find((meal) => meal.id === mealId);

  if (item) {
    item.quantity += 1;
  }

  renderCart();
}
//adding quantity controls
function decreaseQuantity(mealId) {
  const item = cart.find((meal) => meal.id === mealId);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter((meal) => meal.id !== mealId);
  }

  renderCart();
}

function removeFromCart(mealId) {
  cart = cart.filter((meal) => meal.id !== mealId);
  renderCart();
}

//Cart event listener
menuContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const mealId = Number(event.target.dataset.id);
    addToCart(mealId);
  }
});

//quantity control listener
cartItemsContainer.addEventListener("click", (event) => {
  const mealId = Number(event.target.dataset.id);

  if (event.target.classList.contains("increase-btn")) {
    increaseQuantity(mealId);
  }

  if (event.target.classList.contains("decrease-btn")) {
    decreaseQuantity(mealId);
  }

  if (event.target.classList.contains("remove-btn")) {
    removeFromCart(mealId);
  }
});