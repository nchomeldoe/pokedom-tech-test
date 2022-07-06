import pokemonArray from "./data/pokemon.js";

//find types of pokemon
const types = [];
pokemonArray.forEach((pokemon) => {
  pokemon.types.forEach((type) => {
    if (!types.includes(type)) {
      types.push(type);
    }
  });
});
const sortedTypes = types.sort();

//copy pokemon array
let displayedPokemonArray = [...pokemonArray];

// query selectors for containers
const container = document.querySelector(".card-container");
const searchContainer = document.querySelector(".search-container");

// add search section at top of page
searchContainer.innerHTML = `<label for="name-search">Search by name:</label>
    <input type="text" id="name-search" name="name-search">
    <label for="number-search">Number of results:</label>
    <select id="number-search" name="number-search">
      <option value="151">All</option>
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <fieldset>
      <legend>Search by type:</legend>
    </fieldset>`;

//query selector for fieldset
const fieldset = document.querySelector("fieldset");

sortedTypes.forEach((type) => {
  const cappedType = `${type[0].toUpperCase()}${type.substring(1)}`;
  fieldset.innerHTML += ` <input type="checkbox" id="${type}" name="${type}">
      <label for="${type}les">${cappedType}</label>`;
});

//query selectors for search elements
const nameSearch = document.querySelector("#name-search");
const numberSearch = document.querySelector("#number-search");
const typeSearch = document.querySelectorAll(`[type="checkbox"]`);

//function to render cards
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

//function to update displayed array based on searches
const updateDisplayedArray = () => {
  const inputName = nameSearch.value.toLowerCase();
  const inputNumber = Number(numberSearch.value);
  const inputTypes = [];
  typeSearch.forEach((type) => {
    if (type.checked) {
      inputTypes.push(type.id);
    }
  });
  displayedPokemonArray = pokemonArray
    .filter((pokemon) => {
      return (
        pokemon.name.includes(inputName) &&
        inputTypes.every((input) => pokemon.types.includes(input))
      );
    })
    .slice(0, inputNumber);
  handleRender();
};

//event listeners
nameSearch.addEventListener("input", updateDisplayedArray);
numberSearch.addEventListener("input", updateDisplayedArray);
typeSearch.forEach((type) => {
  type.addEventListener("change", updateDisplayedArray);
});

//render on page load
handleRender();
