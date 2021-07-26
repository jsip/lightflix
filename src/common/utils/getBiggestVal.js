const getBiggestVal = (obj) => {
  return new Promise((resolve) => {
    let max = 0;
    let maxIndex = 0;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].popularity > max) {
        maxIndex = i;
        max = obj[i].popularity;
      }
    }
    resolve(obj[maxIndex]);
  });
};

export default getBiggestVal;
