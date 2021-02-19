const API_TOKEN = "c34758b0bfed4b7f09ed7fcf5a93eb1f";

// export function getFilmsFromApiWithSearchedText(text) {
//   const url =
//     "https://api.themoviedb.org/3/search/movie?api_key=" +
//     API_TOKEN +
//     "&language=fr&query=" +
//     text;

//   return fetch(url)
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// }

function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;

  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

function GetMovieFromId(filmId) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    filmId +
    "?api_key=" +
    API_TOKEN +
    "&language=fr";
console.log(url);
    return fetch(url).then(res => res.json()).catch((err) => console.log(err));
}

export function GetMovieFromId0(id) {
  return fetch(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=" +
      API_TOKEN +
      "&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function GetImageUrlFromApi(imageName) {
  if (!imageName) return null;
  return "https://image.tmdb.org/t/p/w300" + imageName;
}

export default {
  getFilmsFromApiWithSearchedText,
  GetImageUrlFromApi,
  GetMovieFromId,
};
