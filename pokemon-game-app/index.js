/*File Descrption:
  Author: Sebastian Rios
  Purpose: canvas position and player position
 */
const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

for (let i = 0; i < collisionsMapData.length; i += 90) {}

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

//Player Creation and Positioning
const playerImage = new Image();
playerImage.src = "./images/playerDown.png";

//Player Position Object
/*playerPosition:
    description: position player in the middle of the canvas
    xAxis: half of the canvas width - half of the player image width
    yAxis: half of the canvas height - half of the player image height
 */
const playerPosition = {
  xAxis: canvas.width / 2 - playerImage.width / 4 / 2,
  yAxis: canvas.height / 2 - playerImage.height / 2,
};

/*Sprite Class:
  props:
    position: x, y
    velocity
    image
  methods:
    draw: canvasContext.drawImage
*/
class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    let { image, position } = this;
    canvasContext.drawImage(image, position.x, position.y);
  }
}

//Create instance of background
const background = new Sprite({
  position: {
    x: -1700,
    y: -1220,
  },
  image: image,
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

//Player Movement
const animate = () => {
  let { w, a, s, d, running } = keys;
  let { position } = background;

  //Infinite Loop for Animation
  window.requestAnimationFrame(animate);
  background.draw();
  canvasContext.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    playerPosition.xAxis,
    playerPosition.yAxis,
    playerImage.width / 4,
    playerImage.height
  );

  //remove up
  if (w.pressed && lastKey === "w") {
    position.y += 3;
    //move up and running
  } else if (w.pressed && running.pressed && lastKey === "W") {
    position.y += 6;
  } else if (a.pressed && lastKey === "a") {
    position.x += 3;
  } else if (a.pressed && running.pressed && lastKey === "A") {
    position.x += 6;
  } else if (s.pressed && lastKey === "s") {
    position.y -= 3;
  } else if (s.pressed && running.pressed && lastKey === "S") {
    position.y -= 6;
  } else if (d.pressed && lastKey === "d") {
    position.x -= 3;
  } else if (d.pressed && running.pressed && lastKey === "D") {
    position.x -= 6;
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

console.log(collisionsMapData);
