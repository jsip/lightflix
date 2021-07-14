import fetchMovies from "./fetchMovies";
import API_KEY from "../utils/constants";

const getMovieInfo = async (movieId) => {
  const movieData = await fetchMovies(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  console.log(movieData);
  return movieData;
};

export default getMovieInfo;
