import API_KEY from "../utils/constants";
import fetchData from "./fetchData";
import lang from "../api/routeri18n";

const genres = async () => {
  const movieList = await fetchData(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${lang}`
  );
  const tvList = await fetchData(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${lang}`
  );
  const genreList = [...movieList.genres, ...tvList.genres];
  return genreList;
};

const getGenre = { genres };

export default getGenre;
