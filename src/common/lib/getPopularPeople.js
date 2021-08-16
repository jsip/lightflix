import API_KEY from "../utils/constants";
import fetchData from "./fetchData";
import lang from "../api/routeri18n";

const getPopularPeople = async () =>
  await fetchData(
    `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=${lang}`
  );

export default getPopularPeople;
