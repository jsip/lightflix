import fetchData from "./fetchData";
import API_KEY from "../utils/constants";

const getSimilarMedia = async (mediaType, Id) =>
  await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );

export default getSimilarMedia;
