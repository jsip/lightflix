import API_KEY from "../utils/constants";
import fetchData from "./fetchData";
import lang from "../api/routeri18n";

const getInfo = async (Id, mediaType) =>
  await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}?api_key=${API_KEY}&language=${lang}`
  );

export default getInfo;
