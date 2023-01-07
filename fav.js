// const sessionString = sessionStorage.getItem("favs");
let favourites = JSON.parse(localStorage.getItem("favorites-local")) || [];

//Getting DOM elements
const favMealList = document.querySelector(".fav-list");
const heading = document.querySelector(".fav-heading");
const back_btn = document.querySelector(".back");

// Funtion to display the favs
const populatePage = () => {
  if (favourites.length == 0) {
    heading.innerHTML = `Sorry you have no favorites keep searching 😅`;
    favMealList.innerHTML = "";
    back_btn.classList.remove("hide");
    return;
  }

  favourites.forEach(async (element) => {
    favMealList.innerHTML = "";

    const meal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element}`
    ).then((res) => {
      if (!res.ok) return;
      return res.json();
    });
    renderMeals(meal.meals[0]);
  });

  // rendering meals
  const renderMeals = (meal) => {
    const li = document.createElement("li");
    li.innerHTML = `<li class="meal-list-item">
    <div class="card">
      <div class="image-container">
        <img
          src="${meal.strMealThumb}"
          alt="Meal Photo"
        />
      </div>
      <div class="details">
        <h3 class="name">${meal.strMeal}</h3>
        <p class="area">Origin : ${meal.strArea}</p>
      </div>
      <div class="btns">
        <button class="more-about btn" id=${meal.idMeal} >👩‍🍳 Let's Cook</button>
        <button class="favourite btn ${
          favourites.includes(meal.idMeal) ? "favourite-active" : ""
        }" id=${meal.idMeal}>❌ Remove</button>
      </div>
      <div class="category">${meal.strCategory}</div>
    </div>
  </li>`;
    favMealList.append(li);
  };
};

// Function to add or remove favourite
const favouriteUpdate = (e) => {
  const newFav = favourites.filter((item) => {
    return item != e.target.id;
  });
  favourites = newFav;

  localStorage.clear();
  localStorage.setItem("ex", JSON.stringify(favourites));
  populatePage();
  return;
};

// Function to view detal page
const showMoreAbout = async (e) => {
  const id = e.target.id;

  const result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(res.message);
    }
    return res.json();
  });
  sessionStorage.removeItem("mealDetails");
  sessionStorage.setItem("mealDetails", JSON.stringify(result.meals));

  window.open("meal-details.html", "_blank");
};

// Listening event in the document
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("favourite")) {
    favouriteUpdate(e);
  }

  if (e.target.classList.contains("more-about")) {
    await showMoreAbout(e);
  }
});

// Back button
back_btn.addEventListener("click", () => {
  window.open("index.html", "_self");
});

//First time populating the page with favs
populatePage();
