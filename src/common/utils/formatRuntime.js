const formatRuntime = (mins) => {
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  return mins > 60
    ? `${hours}${hours === 1 ? "hr" : "hrs"} & ${minutes}${
        minutes === 1 ? "min" : "mins"
      }`
    : `${minutes}${minutes === 1 ? "min" : "mins"}`;
};

export default formatRuntime;
