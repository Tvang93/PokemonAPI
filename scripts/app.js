const searchBarField = document.getElementById("searchBarField");

searchBarField.addEventListener("keypress", async (event) => {
  let entry = searchBarField.value;
  if (event.key === "Enter") {
    // let nameOrNum = parseInt(entry);
    // nameOrNum ? GetPokemonWithName()
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
            console.log(
              pokeEvolution.chain.evolves_to[0].evolves_to[0].species.name
            );
          }
        }
      }
    }
  }
});

const GetPokemon = async (pokename) => {
  let nameOrNum = parseInt(pokename);
  console.log(nameOrNum);
  if (nameOrNum >= 650) {
    return "Invalid Entry. Please type in a pokemon between Gen 1 and 5.";
  } else if (nameOrNum < 650) {
    const promise = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrNum}/`
    );
    const data = await promise.json();
    return data;
  } else {
    const promise = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokename}/`
    );
    if (!promise.ok) {
      return "Invalid Entry. Please type in a pokemon between Gen 1 and 5.";
    } else {
      const data = await promise.json();
      return data;
    }
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
