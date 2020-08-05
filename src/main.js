SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

TYPES_URL = "https://pokeapi.co/api/v2/type/";

/** Searches the pokemon on pokeapi site
 * @param {function} [action] The action to do with the data
 * @const {JSON} [data] The data received from the api
 * @let {string} [pokemonIdOrName] The id or name of the pokemon to search
 */
const searchPokemon = async (event) => {
  if (event) {
    if (event.type === "keypress") {
      if (event.key !== "Enter") return;
    }
  }
  let input = document.querySelector("#search");
  let pokemonIdOrName = input.value.toLowerCase() || 25;
  input.value = "";
  try {
    const { data } = await axios.get(
      `http://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`
    );
    console.log(data);
    printInfo(data);
    return data;
  } catch {
    createElementWithData(
      `${pokemonIdOrName} doesn't exist!`,
      "#results",
      "div"
    );
  }
};

/** Prints the name, weight and height to the document
 * @param {JSON} pokemon The data received from pokeapi
 */
const printInfo = (pokemon) => {
  let results = document.querySelector("#results");
  results.innerHTML = "";
  let infoDiv = createElementWithData("", "#results", "div");
  infoDiv.id = `${pokemon.name}Box`;
  infoDiv.className = "pokeDiv";
  let pokePic = createElementWithData("", `#${infoDiv.id}`, "img");
  pokePic.id = `${pokemon.id}`;
  pokePic.src = pokemon.sprites.front_default
    ? pokemon.sprites.front_default
    : "./no-image.jpg";
  !pokemon.sprites.front_default ? (pokePic.className = "noImg") : "";
  createElementWithData(`name: ${pokemon.name}`, `#${infoDiv.id}`);
  createElementWithData(`weight: ${pokemon.weight}`, `#${infoDiv.id}`);
  createElementWithData(`height: ${pokemon.height}`, `#${infoDiv.id}`);
  let types = "";
  pokemon.types.forEach((element) => {
    types += `<span class="typeBox ${element.type.name}">${element.type.name}</span> `;
  });
  types = types.substring(0, types.length - 2);
  let typeDiv = createElementWithData(`types: ${types}`, `#${infoDiv.id}`);
  typeDiv.className = "types";
};

/** Changes the sprite to back sprite on hover
 * @param {object} event Event who sets the listener
 */
const imgFrontBack = (event) => {
  if (event.target.tagName.toLowerCase() !== "img") return;
  let img = event.target;
  if (img.className === "noImg") return;
  img.src = `${SPRITES_URL}back/${img.id}.png`;
  img.addEventListener(
    "mouseout",
    () => (img.src = `${SPRITES_URL}${img.id}.png`)
  );
};

/** Look for all the pokemon's of the same type
 * @param {*} event the event who set the listener
 */
const searchTypes = async (event) => {
  if (event.target.parentElement.className !== "types") return;
  let type = event.target.classList[1];
  try {
    //replace Axios with fetch
    //fetch
    fetch(`${TYPES_URL}${type}`)
      .then((res) => res.json())
      .then((data) => printTypes(data));
    //Axios
    // const { data } = await axios.get(`${TYPES_URL}${type}`);
    // console.log(data);
    // printTypes(data);
    // return data;
  } catch {
    createElementWithData(
      `Looking for ${type} didn't work!`,
      "#results",
      "div"
    );
  }
};

/** Shows the pokemon from the type list
 * @param {*} event The element who set the listener
 */
const searchPokemonFromTypes = (event) => {
  if (event.target.parentElement.id !== "allPokes") return;
  let pokeToFind = event.target.id;
  let input = document.querySelector("#search");
  input.value = pokeToFind;
  searchPokemon();
  event.target.parentElement.remove();
};

/** Prints all the pokemon's of the same type
 * @param {object} data About all the pokemons of the same type
 */
function printTypes(data) {
  let names = "";
  data.pokemon.forEach((item) => {
    names += `<span class="typeTable" id="${item.pokemon.name}">${item.pokemon.name}</span> `;
  });
  names = names.substring(0, names.length - 2);
  let results = document.querySelector("#results");
  results.innerHTML = "";
  let allPokes = createElementWithData(
    `<h2 id="typeHeader" class="pokeHead">${data.name} Pokemon's</h2> ${names}`,
    "#results"
  );
  allPokes.id = "allPokes";
  allPokes.className = data.name;
}

/** Creates an element in document and prints with the data gathered
 * @param {string} [data=""] The data to show
 * @param {string} [type="span"] The type of element to create
 * @param {string} [father] Where to append the child
 */
function createElementWithData(data = "", father, type = "div") {
  let infoBox = document.querySelector(father);
  let elem = document.createElement(type);
  elem.innerHTML = data;
  infoBox.appendChild(elem);
  return elem;
}

/** Finds element and add event listener
 * @param {string} [element] The element to look for
 * @param {function} [listener] The function to use  as listener
 * @param {string} [type] Type of event
 */
function myQueryAndEventListener(element, listener, type = "click") {
  let elem = document.querySelector(element);
  elem.addEventListener(type, listener);
}

myQueryAndEventListener("#searchButton", searchPokemon);
document.addEventListener("click", searchPokemonFromTypes);
document.addEventListener("click", searchTypes);
document.addEventListener("mouseover", imgFrontBack);
document.addEventListener("keypress", searchPokemon);
