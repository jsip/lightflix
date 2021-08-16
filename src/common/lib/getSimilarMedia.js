import fetchData from "./fetchData";
import API_KEY from "../utils/constants";
import lang from "../api/routeri18n";

const getSimilarMedia = async (mediaType, Id) =>
  await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}/similar?api_key=${API_KEY}&language=${lang}`
  );

export default getSimilarMedia;
