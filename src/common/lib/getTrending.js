import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getTrending = async (mediaType, timeframe) =>
  await fetchData(
    `https://api.themoviedb.org/3/trending/${mediaType}/${timeframe}?api_key=${API_KEY}`
  );

export default getTrending;
