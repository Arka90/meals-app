// Array to get all the result from api
let renderObj = [];

// Fav Array
let favourites = [];

// Getting the local storage
const getLocal = JSON.parse(localStorage.getItem("favorites-local"));

//if local Storage exists then setting to favorites
if (getLocal && getLocal.length > 0) {
  favourites = getLocal;
}

// getting DOM elements
const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".search");
const mealList = document.querySelector(".meal-list");
const favBtn = document.querySelector(".fav");

// Searching and Updating Frontend
const searchAutocomplete = async () => {
  try {
    if (searchInput.value == "") {
      renderObj = [];
      renderSearchItems();
      return;
    }

    const results = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`
    ).then((res) => {
      if (!res.ok) {
        throw new Error(res.message);
      }
      return res.json();
    });

    if (results.meals == null) {
      mealList.innerHTML = "";
      const h1 = document.createElement("h1");
      h1.className = "error";
      h1.innerText = `Sorry we don't have ${searchInput.value} yet 😢💔`;
      mealList.append(h1);
      return;
    }

    const meals = results.meals.map((res) => res);

    renderObj = meals;

    renderSearchItems();
  } catch (e) {
    console.log(e);
  }
};

//render Search items
const renderSearchItems = () => {
  if (renderObj.length == 0) {
    mealList.innerHTML = "";
    return;
  }

  mealList.innerHTML = "";
  renderObj.forEach(async (item) => {
    const li = document.createElement("li");

    li.innerHTML = `<li class="meal-list-item">
    <div class="card">
      <div class="image-container">
        <img
          src="${item.strMealThumb}"
          alt="Meal Photo"
        />
      </div>
      <div class="details">
        <h3 class="name">${item.strMeal}</h3>
        <p class="area">Origin : ${item.strArea}</p>
      </div>
      <div class="btns">
        <button class="more-about btn" id=${item.idMeal}>👩‍🍳Let's Cook</button>
        <button class="favourite btn ${
          favourites.includes(item.idMeal) ? "favourite-active" : ""
        }" id=${item.idMeal}>⭐Favourite</button>
      </div>
      <div class="category">${item.strCategory}</div>
    </div>
  </li>`;
    mealList.append(li);
  });
};

// Adding and Removing favorite items
const makeFavourite = (e) => {
  if (favourites.includes(e.target.id)) {
    const newFav = favourites.filter((item) => item !== e.target.id);
    favourites = newFav;
    localStorage.clear();
    localStorage.setItem("favorites-local", JSON.stringify(favourites));
    e.target.classList.remove("favourite-active");
    return;
  }

  favourites.push(e.target.id);
  localStorage.clear();
  localStorage.setItem("favorites-local", JSON.stringify(favourites));

  e.target.classList.add("favourite-active");
};

//More about Meals
const moreAbout = (e) => {
  const id = e.target.id;
  const clickedMeal = renderObj.filter((item) => item.idMeal == id);
  sessionStorage.setItem("mealDetails", JSON.stringify(clickedMeal));
  window.open("meal-details.html", "_blank");
  localStorage.removeItem("mealDetails");
};

// Listing Events
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("favourite")) {
    makeFavourite(e);
  }

  if (e.target.classList.contains("more-about")) {
    moreAbout(e);
  }
});

favBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.open("favourites.html", "_self");
});

searchInput.addEventListener("keyup", searchAutocomplete);
