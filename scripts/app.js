import {GetPokemonInfo, GetApiwithUrl, GetSpeciesApiWithId, GetPokemonInfoNoRestriction} from "../DataServices/services.js"
import {GetPokemonType} from "./pokemonTypes.js"
import {FindPokemonEvolutions, EvolutionLine} from "./pokemonEvolutions.js"
import {SaveToFavoritePokemons, GetFavoritesFromLocalStorage, RemoveFromFavorites, CheckFavoritePokemons} from "./localStorage.js"

const favoriteTabBtn = document.getElementById("favoriteTabBtn");
const favoritesSelection = document.getElementById("favoritesSelection");
const randomBtn = document.getElementById("randomBtn");
const searchBarField = document.getElementById("searchBarField");
const searchBtn = document.getElementById("searchBtn");

const notFav = document.getElementById("notFav");
const isFav = document.getElementById("isFav");
const pokeName = document.getElementById("pokeName");
const pokeId = document.getElementById("pokeId");
const img1 = document.getElementById("img1");
const form = document.getElementById("form");


const moves = document.getElementById("moves");
const abilities = document.getElementById("abilities");
const locations = document.getElementById("locations");

let pokeInfo;
let entry;

favoriteTabBtn.addEventListener("click", () => {
    CreateFavoritesTab();
})

notFav.addEventListener("click", () => {
    SaveToFavoritePokemons(pokeName.innerText);
    isFav.classList.remove("hidden")
    notFav.classList.add("hidden")
})

isFav.addEventListener("click", () => {
    RemoveFromFavorites(pokeName.innerText);
    notFav.classList.remove("hidden")
    isFav.classList.add("hidden")
})

randomBtn.addEventListener("click", async () => {
    let random = Math.ceil(Math.random()*649);
    GetPokemon(random);
})

searchBarField.addEventListener("keypress", async (event) => {
    entry = searchBarField.value;
    if (event.key === "Enter") {
        GetPokemon(entry.trim().toLowerCase())
    }
});

searchBtn.addEventListener("click", async () => {
    entry = searchBarField.value;
    GetPokemon(entry.trim().toLowerCase())
})

img1.addEventListener("click", async () => {
  SwapImg();
});

const GetPokemon = async (pokemon) => {
  let check = await GetPokemonInfo(pokemon);
  if(check.id != null && parseInt(check.id) < 650){
    pokeInfo = check
  }
  console.log(pokeInfo);
  if (pokeInfo.id != null && parseInt(pokeInfo.id) < 650) {
    //Pokemon Info
    pokeName.innerText = CapitalizeFirstLetter(pokeInfo.name);
    pokeId.innerText = pokeInfo.id.toString().padStart(3, '0');
    moves.innerText = MapThroughData(pokeInfo, "moves", "move", "name").join(", ");
    abilities.innerText = MapThroughData(pokeInfo, "abilities", "ability", "name").join(", ");
    console.log(MapThroughData(pokeInfo, "types", "type", "name"));
    GetPokemonType(pokeInfo);

    img1.src = pokeInfo.sprites.other["official-artwork"].front_default;
    form.innerText = "Form: Default"

    //Locations
    FindPokemonLocations(pokeInfo.location_area_encounters);

    //Evolution
    EvolutionLine(pokeInfo.id);

    //Check Favorites
    IsFavoriteActive(CapitalizeFirstLetter(pokeInfo.name))
  }
};

const MapThroughData = (object, var1, var2, var3) =>
  object[`${var1}`].map((arr) => arr[`${var2}`][`${var3}`]);

const CapitalizeFirstLetter = (word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
}

const FindPokemonLocations = async(url) => {
    let pokeLocations = await GetApiwithUrl(url);
    if (pokeLocations.length > 0) {
      locations.innerText = pokeLocations.map(arr => arr.location_area.name).join(", ");
    } else {
      locations.innerText = "N/A";
    }
}

const IsFavoriteActive = (pokemon) => {
    if(CheckFavoritePokemons(pokemon)){
        isFav.classList.remove("hidden")
        notFav.classList.add("hidden")
    }else{
        notFav.classList.remove("hidden")
        isFav.classList.add("hidden")
    }
}

const CreateFavoritesTab = () => {
    favoritesSelection.innerHTML = "";
    let favoritesList = GetFavoritesFromLocalStorage();
    
    favoritesList.map((favorite) => {
      let favoritesName = document.createElement("p");
      favoritesName.innerText = favorite;
      favoritesName.classList = "favorites-class";
      favoritesName.addEventListener("click", function () {
        let favPokemon = favoritesName.innerText;
        GetPokemon(favPokemon);
      });
      favoritesSelection.appendChild(favoritesName);
    });
  };

const SwapImg = () => {
  if (img1.src == pokeInfo.sprites.other["official-artwork"].front_default) {
    img1.src = pokeInfo.sprites.other["official-artwork"].front_shiny;
    form.innerText = "Form: Shiny"
  } else {
    img1.src = pokeInfo.sprites.other["official-artwork"].front_default;
    form.innerText = "Form: Default"
  }
};

GetPokemon("1")


export {MapThroughData, CapitalizeFirstLetter}