const searchBarField = document.getElementById("searchBarField");
const img1 = document.getElementById("img1");

let pokeInfo;

searchBarField.addEventListener("keypress", async (event) => {
  let entry = searchBarField.value;
  if (event.key === "Enter") {
    pokeInfo = await GetPokemon(entry);
    console.log(pokeInfo);
    if (pokeInfo.id != null) {
      //Pokemon Info
      console.log(pokeInfo.name);
      console.log(pokeInfo.id);
      console.log(GetMovesOrAblities(pokeInfo, "moves", "move", "name"));
      console.log(GetMovesOrAblities(pokeInfo, "abilities", "ability", "name"));
      img1.src = pokeInfo.sprites.other["official-artwork"].front_default;

      //Locations
      let locations = await GetApiwithUrl(pokeInfo.location_area_encounters);
      if (location.length > 0) {
        console.log(locations[0].location_area.name);
      } else {
        console.log("n/a");
      }

      //Evolution
      let pokeSpecies = await GetSpeciesApiWithId(pokeInfo.id);
      let pokeEvolution = await GetApiwithUrl(pokeSpecies.evolution_chain.url);
      console.log(pokeEvolution.chain.species.name);
      if (pokeEvolution.chain.evolves_to.length > 0) {
        for (let i = 0; i < pokeEvolution.chain.evolves_to.length; i++) {
          console.log(pokeEvolution.chain.evolves_to[i].species.name);
          if (pokeEvolution.chain.evolves_to[i].evolves_to.length > 0) {
            for (let j = 0; j < pokeEvolution.chain.evolves_to[i].evolves_to.length; j++)
              console.log(pokeEvolution.chain.evolves_to[i].evolves_to[j].species.name);
          }
        }
      }
    }
  }
});

img1.addEventListener("click", async () => {
    SwapImg();
})

const GetPokemon = async (pokename) => {
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

const GetMovesOrAblities = (array, var1, var2, var3) =>
  array[`${var1}`].map((moves) => moves[`${var2}`][`${var3}`]).join(", ");

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
    if(img1.src == pokeInfo.sprites.other["official-artwork"].front_default){
        img1.src = pokeInfo.sprites.other["official-artwork"].front_shiny;
        console.log("shiny")
    }else{
        img1.src = pokeInfo.sprites.other["official-artwork"].front_default
        console.log("default")
    }
}