/*File Descrption:
  Author: Sebastian Rios
  Purpose: canvas position and player position
 */
const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

/*Collisions Configuration
  collisionsMap (array): local array with 90 length arrays contained with collisions
  collisionsMapData (array): array exported from map collisioned layer
  Boundary (class): class which contains properties for collisions map
    props:
      position: positions for boundaries
      width: width of zoomed map into canvas
      height: height of zoomed map into canvas
    methods:
      draw: draw collisioned map into canvas
  boundaries (array): individual collisions into array
*/
const collisionsMap = [];

for (let i = 0; i < collisionsMapData.length; i += 90) {
  collisionsMap.push(collisionsMapData.slice(i, i + 90));
}

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

//Canvas Creation and Positioning
/*canvasContext:
    getContext: contains big object responsible for drawing out objects
    fillRect: create rectangle (x position, y position, width, height)
    fillStyle: apply style to canvas
    drawImage: display image source into canvas (
      html image, 
      crop-position-x-axis,
      crop-position-y-axis,
      crop-width-distance,
      crop-height-distance, 
      dx, 
      dy,
      render-x-axis,
      render-y-axis) 
*/
const canvasContext = canvas.getContext("2d");

//Image Creation and Positioning
/*image:
    src: contains the source image
    onload: callback function that waits the image to load on screen
*/
const image = new Image();
image.src = "./images/Pokemon Styled Game Map.png";

//Foreground Creation and Positioing
const foregroundImage = new Image();
foregroundImage.src = "./images/foregroundObjects.png";

//Player Creation and Positioning
const playerDownImage = new Image();
playerDownImage.src = "./images/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./images/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./images/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./images/playerRight.png";

//Player Position Object
/*playerPosition:
    description: position player in the middle of the canvas
    xAxis: half of the canvas width - half of the player image width
    yAxis: half of the canvas height - half of the player image height
 */

//CONTINUE WITH FILE DIVISION
const playerPosition = {
  xAxis: canvas.width / 2 - playerDownImage.width / 4 / 2,
  yAxis: canvas.height / 2 - playerDownImage.height / 2,
};

const player = new Sprite({
  position: {
    x: playerPosition.xAxis,
    y: playerPosition.yAxis,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

//Create instance of background
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

//Create instance of foreground
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

//Pressed Key Properties
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  running: {
    pressed: false,
  },
};

const movables = [background, ...boundaries, foreground];

const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
};

//Player Movement
const animate = () => {
  let { w, a, s, d, running } = keys;

  //Infinite Loop for Animation
  window.requestAnimationFrame(animate);
  //draw background
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();
  foreground.draw();

  /*Logic Proces:
    going throught each boundary, if detect with the rectangularCollision 
    function, set moving to false and player wont me able to move
  */
  let moving = true;
  player.moving = false;
  if (w.pressed && lastKey === "w") {
    player.moving = true;
    player.image = player.sprites.up;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y + 3 },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    }
  } else if (a.pressed && lastKey === "a") {
    player.moving = true;
    player.image = player.sprites.left;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x + 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    }
  } else if (s.pressed && lastKey === "s") {
    player.moving = true;
    player.image = player.sprites.down;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y - 3 },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    }
  } else if (d.pressed && lastKey === "d") {
    player.moving = true;
    player.image = player.sprites.right;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x - 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
  }
};

animate();

let lastKey = "";

document.addEventListener("keydown", (event) => {
  let { w, a, s, d, running } = keys;
  switch (event.key) {
    case "w":
      w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      d.pressed = true;
      lastKey = "d";
      break;
    case "W":
      w.pressed = true;
      running.pressed = true;
      lastKey = "W";
      break;
    case "A":
      a.pressed = true;
      running.pressed = true;
      lastKey = "A";
      break;
    case "S":
      s.pressed = true;
      running.pressed = true;
      lastKey = "S";
      break;
    case "D":
      d.pressed = true;
      running.pressed = true;
      lastKey = "D";
      break;
  }
});

document.addEventListener("keyup", (event) => {
  let { w, a, s, d, running } = keys;
  switch (event.key) {
    case "w":
      w.pressed = false;
      break;
    case "a":
      a.pressed = false;
      break;
    case "s":
      s.pressed = false;
      break;
    case "d":
      d.pressed = false;
      break;
    case "W":
      w.pressed = false;
      running.pressed = false;
      break;
    case "A":
      a.pressed = false;
      running.pressed = false;
      break;
    case "S":
      s.pressed = false;
      running.pressed = false;
      break;
    case "D":
      d.pressed = false;
      running.pressed = false;
      break;
  }
});
