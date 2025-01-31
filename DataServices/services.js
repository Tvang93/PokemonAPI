const GetPokemonInfo = async (pokename) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}/`);
  if (!promise.ok) {
    alert("Invalid Entry. Please type in a pokemon between Gen 1 and 5.");
  }else{
    const data = await promise.json();
    if(data.id >= 650){
      alert("Invalid Entry. Please type in a pokemon between Gen 1 and 5.");
    }
    return data;
  }
};

const GetPokemonInfoNoRestriction = async(pokemon) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  const data = await promise.json()
  return data
} 

const GetApiwithUrl = async (url) => {
  const promise = await fetch(url);
  const data = promise.json();
  return data;
};

const GetSpeciesApiWithId = async (id) => {
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = promise.json();
  return data;
};


export {GetPokemonInfo, GetApiwithUrl, GetSpeciesApiWithId, GetPokemonInfoNoRestriction}