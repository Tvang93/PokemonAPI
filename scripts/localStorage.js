const SaveToFavoritePokemons = (pokemon) => {
  let pokeArr = GetFavoritesFromLocalStorage();
  if (!pokeArr.includes(pokemon)) {
    pokeArr.push(pokemon);
  }
  localStorage.setItem("FavoritePokemons", JSON.stringify(pokeArr));
};

const GetFavoritesFromLocalStorage = () => {
  let localStorageData = localStorage.getItem("FavoritePokemons");
  if (localStorageData == null) {
    return [];
  }
  return JSON.parse(localStorageData);
};

const RemoveFromFavorites = (pokemon) => {
  let localStorageData = GetFavoritesFromLocalStorage();
  console.log(localStorageData);
  console.log(typeof localStorageData);
  let nameIndex = localStorageData.indexOf(pokemon);
  localStorageData.splice(nameIndex, 1)
  localStorage.setItem("FavoritePokemons", JSON.stringify(localStorageData));
};

const CheckFavoritePokemons = (pokemon) => {
    let pokeArr = GetFavoritesFromLocalStorage();
    console.log(pokeArr.includes(pokemon))
    if (pokeArr.includes(pokemon)) {
      return true;
    }else{
      return false;
    }
  };

export {SaveToFavoritePokemons, GetFavoritesFromLocalStorage, RemoveFromFavorites, CheckFavoritePokemons}