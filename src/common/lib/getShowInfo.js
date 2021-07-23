import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getShowInfo = async (showId) => {
  const showData = await fetchData(
    `https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}&language=en-US`
  );
  return showData;
};

export default getShowInfo;
