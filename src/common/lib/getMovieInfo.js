import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getMovieInfo = async (movieId) => {
  const movieData = await fetchData(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return movieData;
};

export default getMovieInfo;
