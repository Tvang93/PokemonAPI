import {MapThroughData, CapitalizeFirstLetter} from "./app.js"

const secondaryType = document.getElementById("secondaryType");
const pokeType = [
    document.getElementById("pokeType1"),
    document.getElementById("pokeType2"),
]
const pokeTypeImg = [
    document.getElementById("typeImg"),
    document.getElementById("type2Img"),
]

const GetPokemonType = (data) => {
    secondaryType.classList.add("hidden")
    let typeArr = MapThroughData(data, "types", "type", "name")
    console.log(typeArr.length)
    console.log(typeArr[0])
    console.log(pokeType[0].innerText)
    for(let i = 0; i < typeArr.length;i++){
        pokeType[i].innerText = CapitalizeFirstLetter(typeArr[i]);
        let var1 = pokeType[i].innerText;
        let var2 = pokeTypeImg[i];
        GetTypeIcon(var1, var2)
    }
    if(typeArr.length>1){
        secondaryType.classList.remove("hidden")
    }
}


const GetTypeIcon = (type, var1) => {
    switch(type.toString().toLowerCase()){
        case "grass":
            var1.src = "../assets/pokemonTypes/grass.png"
            break;
        case "fire":
            var1.src = "../assets/pokemonTypes/fire.png"
            break;
        case "water":
            var1.src = "../assets/pokemonTypes/water.png"
            break;
        case "ground":
            var1.src = "../assets/pokemonTypes/ground.png"
            break;
        case "normal":
            var1.src = "../assets/pokemonTypes/normal.png"
            break;
        case "fighting":
            var1.src = "../assets/pokemonTypes/fighting.png"
            break;
        case "ghost":
            var1.src = "../assets/pokemonTypes/ghost.png"
            break;
        case "dragon":
            var1.src = "../assets/pokemonTypes/dragon.png"
            break;
        case "rock":
            var1.src = "../assets/pokemonTypes/rock.png"
            break;
        case "ice":
            var1.src = "../assets/pokemonTypes/ice.png"
            break;
        case "bug":
            var1.src = "../assets/pokemonTypes/bug.png"
            break;
        case "fairy":
            var1.src = "../assets/pokemonTypes/fairy.png"
            break;
        case "psychic":
            var1.src = "../assets/pokemonTypes/psychic.png"
            break;
        case "dark":
            var1.src = "../assets/pokemonTypes/dark.png"
            break;
        case "steel":
            var1.src = "../assets/pokemonTypes/steel.png"
            break;
        case "flying":
            var1.src = "../assets/pokemonTypes/flying.png"
            break;
        case "electric":
            var1.src = "../assets/pokemonTypes/electric.png"
            break;
        default:
            var1.src = "../assets/pokemonTypes/poison.png"
            break;
    }
}

export {GetPokemonType}