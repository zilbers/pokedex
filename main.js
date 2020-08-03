/** Searches the pokemon on pokeapi site
 * @param {string} [pokemonIdOrName] The id or name of the pokemon to search
 * @param {function} [action] The action to do with the data
 * @const {JSON} [data] The data received from the api
 */
const searchPokemon = async (pokemonIdOrName = 25, action = printInfo) => {
  const { data } = await axios.get(
    `http://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`
  );
  console.log(data);
  action(data);
  return data;
};

/** Prints the name, weight and height to the document
 * @param {JSON} pokemon The data received from pokeapi
 */
const printInfo = (pokemon) => {
  let pokeName = createElementWithData(`name = ${pokemon.name}`);
  let pokeWeight = createElementWithData(`weight = ${pokemon.weight}`);
  let pokeHeight = createElementWithData(`height = ${pokemon.height}`);
};

/** Creates an element in document and prints with the data gathered
 * @param {string} [data=""] The data to show
 * @param {string} [type="span"] The type of element to create
 */
function createElementWithData(data = "", type = "span") {
  let infoBox = document.querySelector("#results");
  let elem = document.createElement(type);
  elem.innerHTML = data;
  infoBox.appendChild(elem);
}

function myQueryAndEventListener(element, listener, type = "click") {
  let elem = document.querySelector(element);
  elem.addEventListener(type, listener);
}

myQueryAndEventListener("#searchButton", searchPokemon);
// searchPokemon();
