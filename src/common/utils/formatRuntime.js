const formatRuntime = (mins) => {
  Array.isArray(mins) && (mins = mins.reduce((t, c) => t + c, 0) / mins.length);
  let hours = Math.floor(mins / 60);
  let minutes = mins !== 60 ? mins % 60 : mins;
  return mins > 60
    ? `${hours}${hours === 1 ? "hr" : "hrs"} & ${minutes}${
        minutes === 1 ? "min" : "mins"
      }`
    : `${Math.ceil(minutes)}${minutes === 1 ? "min" : "mins"}`;
};

export default formatRuntime;
