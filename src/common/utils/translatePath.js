const translatePath = (path) => {
  switch (path) {
    case "casts":
      return "crédits";
    case "movies":
      return "films";
    case "shows":
      return "séries";
    default:
      return path;
  }
};

export default translatePath;
