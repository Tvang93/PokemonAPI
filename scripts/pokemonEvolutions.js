import {GetPokemonInfo, GetApiwithUrl, GetSpeciesApiWithId, GetPokemonInfoNoRestriction} from "../DataServices/services.js"
import {CapitalizeFirstLetter} from "./app.js"

const evoBox = document.getElementById("evoBox")

let firstStage = [];
let midStage = [];
let finalStage = [];

const FindPokemonEvolutions = async(pokemon) => {
    firstStage = [];
    midStage = [];
    finalStage = []
    let pokeSpecies = await GetSpeciesApiWithId(pokemon);
    let pokeEvolution = await GetApiwithUrl(pokeSpecies.evolution_chain.url);
    firstStage.push(pokeEvolution.chain.species.name);
    if (pokeEvolution.chain.evolves_to.length > 0) {
      for (let i = 0; i < pokeEvolution.chain.evolves_to.length; i++) {
        midStage.push(pokeEvolution.chain.evolves_to[i].species.name);
        if (pokeEvolution.chain.evolves_to[i].evolves_to.length > 0) {
          for (let j = 0; j < pokeEvolution.chain.evolves_to[i].evolves_to.length; j++)
            finalStage.push(pokeEvolution.chain.evolves_to[i].evolves_to[j].species.name);
        }
      }
    }
}

const FirstStagePokemon = async(pokemon) => {
    await FindPokemonEvolutions(pokemon);
    await CreateEvoIcons(firstStage);
    await CreateEvoIcons(midStage);
    await CreateEvoIcons(finalStage);
}

const EvolutionLine = async(pokeman) => {
    evoBox.innerHTML = "";
    FirstStagePokemon(pokeman);
}

const CreateEvoIcons = async(stage) => {
    let firstStageBox = document.createElement("div");
    for(let i = 0; i < stage.length; i++){
        let pokemonInfo = await GetPokemonInfoNoRestriction(stage[i]);
        if(pokemonInfo.id > 649){
            break;
        }
        let firstStageImg = document.createElement("img");
        firstStageImg.src = pokemonInfo.sprites.other["official-artwork"].front_default;
        firstStageImg.classList = "max-w-15 lg:max-w-20";

        let firstStageName = document.createElement("h1");
        firstStageName.innerText = CapitalizeFirstLetter(pokemonInfo.name);
        if(stage.length>2){
            firstStageBox.classList = "flex overflow-x-scroll lg:mt-5"
            let div = document.createElement("div");
            div.classList = "flex flex-col mx-3"
            
            div.appendChild(firstStageImg);
            div.appendChild(firstStageName);
            firstStageBox.appendChild(div)
        }else if(stage.length>1){
            firstStageBox.classList = "flex justify-center lg:mt-5"
            let div = document.createElement("div");
            div.classList = "flex flex-col items-center mx-4"

            div.appendChild(firstStageImg);
            div.appendChild(firstStageName);
            firstStageBox.appendChild(div)
        }else{
            firstStageBox.classList = "flex flex-col items-center lg:mt-5"
            firstStageBox.appendChild(firstStageImg);
            firstStageBox.appendChild(firstStageName);
        }
    }
    evoBox.appendChild(firstStageBox)
}




export {FindPokemonEvolutions, EvolutionLine}