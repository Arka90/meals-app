const sessionString = sessionStorage.getItem("mealDetails");
let mealDetails = JSON.parse(sessionString);

const mealOBJ = mealDetails[0];

const image = document.querySelector(".image");
const name = document.querySelector(".meal-name");
const instruction = document.querySelector(".instruction-para");
const source = document.querySelector(".source");
const youtube = document.querySelector(".youtube");
const origin = document.querySelector(".origin");
const type = document.querySelector(".type");
const incList = document.querySelector(".incredients-list");

for (let i = 1; i <= 20; i++) {
  if (
    mealOBJ[`strIngredient${i}`] == "" ||
    mealOBJ[`strIngredient${i}`] == null
  ) {
    break;
  }

  const li = document.createElement("li");

  const quantity = mealOBJ[`strMeasure${i}`];
  const name = mealOBJ[`strIngredient${i}`];

  li.innerHTML = `<li class="incredients-list-items">
    <i class="fa-sharp fa-solid fa-utensils"></i> ${quantity} ${name}
  </li>`;
  incList.append(li);
}
document.title = mealOBJ.strMeal;
image.src = mealOBJ.strMealThumb;
name.innerHTML = mealOBJ.strMeal;
instruction.innerHTML = mealOBJ.strInstructions;
origin.innerHTML = `<i class="fa-sharp fa-solid fa-location-dot"></i> ${mealOBJ.strArea}`;
type.innerHTML = ` <i class="fa-sharp fa-solid fa-layer-group"></i> ${mealOBJ.strCategory}`;
source.addEventListener("click", () => {
  const url = mealOBJ.strSource;

  window.open(url, "_blank");
});

youtube.addEventListener("click", () => {
  const url = mealOBJ.strYoutube;
  window.open(url, "_blank");
});
