/*File Descrption:
  Author: Sebastian Rios
  Purpose: canvas position and player position
 */
const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;

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
canvasContext.fillStyle = "white";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

/*image:
    src: contains the source image
    onload: callback function that waits the image to load on screen
*/
const image = new Image();
image.src = "./images/Pokemon Styled Game Map.png";

const playerImage = new Image();
playerImage.src = "./images/playerDown.png";

/*playerPosition:
    description: position player in the middle of the canvas
    xAxis: half of the canvas width - half of the player image width
    yAxis: half of the canvas height - half of the player image height
 */
const playerPosition = {
  xAxis: canvas.width / 2 - playerImage.width / 4 / 2,
  yAxis: canvas.height / 2 - playerImage.height / 2,
};

image.onload = () => {
  canvasContext.drawImage(image, -1700, -1220);
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
};
