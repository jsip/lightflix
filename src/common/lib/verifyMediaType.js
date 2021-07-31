const matchKey = (mediaInfo) => {
  for (let mi of mediaInfo) {
    if (mi.name) {
      mi.media_type = "tv"
    } else if (mi.title) {
      mi.media_type = "movie"
    }
  }
  return mediaInfo;
};

const verifyMediaType = (mediaInfo) => {
  if (mediaInfo.media_type) {
    return mediaInfo;
  } else if (!mediaInfo.media_type) {
    return matchKey(mediaInfo);
  }
};

export default verifyMediaType;
