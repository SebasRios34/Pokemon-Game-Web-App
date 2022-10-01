const collisionsMap = [];

for (let i = 0; i < collisionsMapData.length; i += 90) {
  collisionsMap.push(collisionsMapData.slice(i, i + 90));
}
