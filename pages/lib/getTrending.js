import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getTrending = async (mediaType, timeframe) => {
  const trendingData = await fetchData(
    `https://api.themoviedb.org/3/trending/${mediaType}/${timeframe}?api_key=${API_KEY}`
  );
  return trendingData;
};

export default getTrending;
