import {GetPokemonInfo, GetApiwithUrl, GetSpeciesApiWithId} from "../DataServices/services.js"
import {GetPokemonType} from "./pokemonTypes.js"
import {FindPokemonEvolutions} from "./pokemonEvolutions.js"

const favoriteTabBtn = document.getElementById("favoriteTabBtn");
const randomBtn = document.getElementById("randomBtn");
const searchBarField = document.getElementById("searchBarField");
const searchBtn = document.getElementById("searchBtn");

const pokeName = document.getElementById("pokeName");
const pokeId = document.getElementById("pokeId");
const img1 = document.getElementById("img1");
const form = document.getElementById("form");


const moves = document.getElementById("moves");
const abilities = document.getElementById("abilities");
const locations = document.getElementById("locations");

let pokeInfo;
let entry;

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
  pokeInfo = await GetPokemonInfo(pokemon);
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
    FindPokemonEvolutions(pokeInfo.id);
  }
};


// const PokeNameOrNum = (pokemon) => {
//     let pokeNum = parseInt(pokemon)
//     if(pokeNum != NaN){
        
//         return GetPokemonInfo(pokeNum);
//     }else{
//         console.log(pokeNum)
//         console.log(pokemon)
//         return GetPokemonInfo(pokemon);
//     }
// }


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

// const FindPokemonEvolutions = async(pokemon) => {
//     let pokeSpecies = await GetSpeciesApiWithId(pokemon);
//     let pokeEvolution = await GetApiwithUrl(pokeSpecies.evolution_chain.url);
//     console.log(pokeEvolution.chain.species.name);
//     if (pokeEvolution.chain.evolves_to.length > 0) {
//       for (let i = 0; i < pokeEvolution.chain.evolves_to.length; i++) {
//         console.log(pokeEvolution.chain.evolves_to[i].species.name);
//         if (pokeEvolution.chain.evolves_to[i].evolves_to.length > 0) {
//           for (let j = 0; j < pokeEvolution.chain.evolves_to[i].evolves_to.length; j++)
//             console.log(pokeEvolution.chain.evolves_to[i].evolves_to[j].species.name);
//         }
//       }
//     }
// }

const SwapImg = () => {
  if (img1.src == pokeInfo.sprites.other["official-artwork"].front_default) {
    img1.src = pokeInfo.sprites.other["official-artwork"].front_shiny;
    form.innerText = "Form: Shiny"
  } else {
    img1.src = pokeInfo.sprites.other["official-artwork"].front_default;
    form.innerText = "Form: Default"
  }
};

// GetPokemon("1")


export {MapThroughData, CapitalizeFirstLetter}