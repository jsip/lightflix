import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getMovieVideos = async (movieId) => {
  const movieData = await fetchData(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );
  return movieData.results;
};

export default getMovieVideos;
