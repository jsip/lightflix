import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getCastInfo = async (castId) => {
  const castData = await fetchData(
    `https://api.themoviedb.org/3/person/${castId}?api_key=${API_KEY}&language=en-US`
  );
  return castData;
};

export default getCastInfo;
