const favoriteTabBtn = document.getElementById("favoriteTabBtn");
const randomBtn = document.getElementById("randomBtn");
const searchBarField = document.getElementById("searchBarField");
const pokeName = document.getElementById("pokeName");
const pokeId = document.getElementById("pokeId");
const img1 = document.getElementById("img1");
const form = document.getElementById("form");
const moves = document.getElementById("moves");
const abilities = document.getElementById("abilities");
const locations = document.getElementById("locations");

let pokeInfo;
let entry;

searchBarField.addEventListener("keypress", async (event) => {
    entry = searchBarField.value;
    if (event.key === "Enter") {
    GetPokemon(entry.trim().toLowerCase())
  }
});

img1.addEventListener("click", async () => {
  SwapImg();
});

const GetPokemon = async (pokemon) => {
  pokeInfo = await GetPokemonInfo(pokemon);
  console.log(pokeInfo);
  if (pokeInfo.id != null && parseInt(pokeInfo.id) < 650) {
    //Pokemon Info
    pokeName.innerText = `${pokeInfo.name.charAt(0).toUpperCase()}${pokeInfo.name.slice(1)}`;
    pokeId.innerText = pokeInfo.id.toString().padStart(3, '0');
    moves.innerText = GetMovesOrAblities(pokeInfo, "moves", "move", "name");
    abilities.innerText = GetMovesOrAblities(pokeInfo, "abilities", "ability", "name");
    console.log(GetMovesOrAblities(pokeInfo, "types", "type", "name"));

    img1.src = pokeInfo.sprites.other["official-artwork"].front_default;
    form.innerText = "Form: Default"

    //Locations
    let pokeLocations = await GetApiwithUrl(pokeInfo.location_area_encounters);
    console.log(pokeInfo.location_area_encounters)
    if (pokeLocations.length > 0) {
      locations.innerText = pokeLocations.map(arr => arr.location_area.name).join(", ");
    } else {
      locations.innerText = "N/A";
    }

    //Evolution
    let pokeSpecies = await GetSpeciesApiWithId(pokeInfo.id);
    let pokeEvolution = await GetApiwithUrl(pokeSpecies.evolution_chain.url);
    console.log(pokeEvolution.chain.species.name);
    if (pokeEvolution.chain.evolves_to.length > 0) {
      for (let i = 0; i < pokeEvolution.chain.evolves_to.length; i++) {
        console.log(pokeEvolution.chain.evolves_to[i].species.name);
        if (pokeEvolution.chain.evolves_to[i].evolves_to.length > 0) {
          for (
            let j = 0;
            j < pokeEvolution.chain.evolves_to[i].evolves_to.length;
            j++
          )
            console.log(
              pokeEvolution.chain.evolves_to[i].evolves_to[j].species.name
            );
        }
      }
    }
  }
};

const PokeNameOrNum = (pokemon) => {
    let pokeNum = parseInt(pokemon)
    if(pokeNum != NaN){
        
        return GetPokemonInfo(pokeNum);
    }else{
        console.log(pokeNum)
        console.log(pokemon)
        return GetPokemonInfo(pokemon);
    }
}

const GetPokemonInfo = async (pokename) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}/`);
  if (!promise.ok) {
    alert("Invalid Entry. Please type in a pokemon between Gen 1 and 5.");
  } else {
    const data = await promise.json();
    if (data.id >= 650) {
      alert("Invalid Entry. Please type in a pokemon between Gen 1 and 5.");
    }
    return data;
  }
};

const GetMovesOrAblities = (object, var1, var2, var3) =>
  object[`${var1}`].map((arr) => arr[`${var2}`][`${var3}`]).join(", ");

const GetApiwithUrl = async (url) => {
  const promise = await fetch(url);
  const data = promise.json();
  return data;
};

const GetSpeciesApiWithId = async (id) => {
  const promise = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );
  const data = promise.json();
  return data;
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


// GetPokemon("1")