# Pokedex

the API used: https://pokeapi.co/

Features:
* Search Pokemon in search bar.
* Reaches pokeapi and asks for info about Pokemon's.
* Shows Pokemon info on screen.
* Shows sprite and changes back and forth.

Tasks:
* Read about cross origin and way to handle it
* Use [this](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en) chrome extension for unblock cross origin when working on local file 
* Show Pokemon name height weight and image on search id
* Make the image change to `back_default` on hover
* Support search by name ([HINT](https://pokeapi.co/docs/v2#pokemon))
* Add not found message if the API return it (case the pokemon doesn't exist)
* Show list of types names for each pokemon
* On click on one of the pokemon types show list of all the pokemon's names that related to this type ([HINT](https://pokeapi.co/docs/v2#type:~:text=lines\)-,Type))
* On Click on one of the pokemon name change the pokedex context by changing the input value to the name of the pokemon

Bonus:
* Use fetch/xhr instead of axios for one call
* Add your own feature - using another pokeapi.co api end point 