import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getVideos = async (Id, mediaType) => {
  let urls = [];
  const videoData = await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}/videos?api_key=${API_KEY}`
  );
  if (mediaType !== "person") {
    for (let v of videoData.results) {
      urls = [...urls, v.key];
    }
  }
  return urls;
};

const getImages = async (Id, mediaType) => {
  const imageData = await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}/images?api_key=${API_KEY}`
  );
  return imageData;
};

const media = { getVideos, getImages };

export default media;