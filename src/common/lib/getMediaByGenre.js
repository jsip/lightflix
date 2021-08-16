import fetchData from "./fetchData";
import API_KEY from "../utils/constants";
import lang from "../api/routeri18n";

const getMediaByGenre = async (mediaType, Id) =>
  await fetchData(
    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&with_genres=${Id}&language=${lang}`
  );

export default getMediaByGenre;
