import {GetPokemonInfo, GetApiwithUrl, GetSpeciesApiWithId} from "../DataServices/services.js"

const FindPokemonEvolutions = async(pokemon) => {
    let pokeSpecies = await GetSpeciesApiWithId(pokemon);
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


export {FindPokemonEvolutions}