const boundaries = [];

const offset = {
  x: -1695,
  y: -1240,
};

/*pushing items into boundaries (array)
  description: loop throught the items inside an array, which are inside another array
  [
    [0, 1025, 0],
    [1025, 0, 1025],
    [0, 1025, 0]
  ]
  x & y: represent the position of the red collision block in the map
*/
collisionsMap.forEach((row, yIndex) => {
  row.forEach((redSymbol, xIndex) => {
    if (redSymbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: xIndex * Boundary.width + offset.x,
            y: yIndex * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});
