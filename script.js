import pokemonArray from "./data/pokemon.js";

// query selectors
const container = document.querySelector(".card-container");

pokemonArray.forEach((pokemon) => {
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
