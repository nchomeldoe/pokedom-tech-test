import pokemonArray from "./data/pokemon.js";

let displayedPokemonArray = [...pokemonArray];

// query selectors
const container = document.querySelector(".card-container");
const nameSearch = document.querySelector("#name-search");
console.dir(nameSearch);
const numberSearch = document.querySelector("#number-search");
console.dir(numberSearch);

const handleRender = () => {
  container.innerHTML = "";

  displayedPokemonArray.forEach((pokemon) => {
    const { id, name, types, sprite } = pokemon;
    const cappedName = `${name[0].toUpperCase()}${name.substring(1)}`;
    let typeStr = `${types[0]}`;
    for (let i = 1; i < types.length; i++) {
      typeStr += ` & ${types[i]}`;
    }
    container.innerHTML += `<div class="card">
    <img src=${sprite} alt=${name} crossorigin="anonymous" class="card__image"/>
    <div class="card__content">
      <h2 class="card__heading">${cappedName}</h2>
      <p class="card__text">${cappedName} (#${id}) is a ${typeStr} type pokemon.</p>
    </div>
  </div>`;
  });
};

const updateDisplayedArray = () => {
  const inputName = nameSearch.value.toLowerCase();
  const inputNumber = Number(numberSearch.value);
  console.log(inputName, inputNumber);
  displayedPokemonArray = pokemonArray
    .filter((pokemon) => {
      return pokemon.name.includes(inputName);
    })
    .slice(0, inputNumber);
  handleRender();
};

nameSearch.addEventListener("input", updateDisplayedArray);
numberSearch.addEventListener("input", updateDisplayedArray);

handleRender();
