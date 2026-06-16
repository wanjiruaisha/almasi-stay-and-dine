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
];
// Selecting elements from the HTML page
const menuContainer = document.getElementById("menuContainer");
const menuMessage = document.getElementById("menuMessage");

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
      </div>
    `;

    menuContainer.appendChild(mealCard);
  });
}

renderMeals(meals);