const initialState = { favoriteFilms: [] };

export default function tooggleFavoriteReducer(state = initialState, action) {
  let nextState;
  //console.log(state);
  switch (action.type) {
    case "TOOGLE_FAVORITE":
      const favoriteFilmIndex = state.favoriteFilms.findIndex(
        (item) => item.id === action.value.id
      );
      // si le film est deja dans les favoris, on le supprime
      if (favoriteFilmIndex !== -1) {
        nextState = {
          ...state, // toujours copier le state dans le nextstate au cas ou il y aurait plus propriété, meme si ici c'est inutile car on en a qu'une
          favoriteFilms: state.favoriteFilms.filter(
            (item, index) => index !== favoriteFilmIndex
          ),
        };
    // ajout du film
      } else {
          nextState = {...state, favoriteFilms: [ ...state.favoriteFilms, action.value ]};
      }
      // on renvoi state si jamais nextState == undefined
     // console.log(nextState);
      return nextState || state;
    default:
      return state;
  }
}

//export default { tooggleFavoriteReducer };