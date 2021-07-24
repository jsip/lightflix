const getBiggestVal = (obj) => {
  let max = 0;
  let maxIndex = 0;
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].popularity > max) {
      maxIndex = i;
      max = obj[i].popularity;
    }
  }
  return obj[maxIndex];
};

export default getBiggestVal;
