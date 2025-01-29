const searchBarField = document.getElementById("searchBarField");

searchBarField.addEventListener("keypress", async (event) => {
  let entry = searchBarField.value;
  if (event.key === "Enter") {
    let pokeInfo = await GetPokemon(entry);
    console.log(pokeInfo);
    if (pokeInfo.id != null) {
      console.log(pokeInfo);
      console.log(pokeInfo.name);
      console.log(pokeInfo.id);
      console.log(pokeInfo.moves);
      console.log(GetMoveName(pokeInfo.moves, "move"));
      console.log(GetMoveName(pokeInfo.abilities, "ability"));
      console.log(GetMoveName(pokeInfo.types, "type"));
      console.log(pokeInfo.location_area_encounters);
      let locations = await GetApiwithUrl(pokeInfo.location_area_encounters);
      if (location.length > 0) {
        console.log(locations[0].location_area.name);
      } else {
        console.log("n/a");
      }
      let pokeSpecies = await GetSpeciesApiWithId(pokeInfo.id);
      let pokeEvolution = await GetApiwithUrl(pokeSpecies.evolution_chain.url);
      console.log(pokeEvolution);
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
  }
});

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

const GetMoveName = (array, thing) => {
  let newArr = [];
  array.forEach((element) => {
    newArr.push(element[`${thing}`].name);
  });
  return newArr.join(", ");
};

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
