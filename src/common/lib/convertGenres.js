import fetchData from "./fetchData";
import API_KEY from "../utils/constants";

const convertGenres = async (mediaType, genreIds) => {
  let genres = [];
  const genreLists =
    mediaType === "movies"
      ? await fetchData(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        )
      : await fetchData(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
        );
  for (let g of genreIds) {
    genreLists.genres.find((genre) =>
      genre.id === g ? (genres = [...genres, genre]) : null
    );
  }
  return genres;
};

export default convertGenres;
