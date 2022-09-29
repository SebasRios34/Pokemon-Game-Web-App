const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;
/*canvasContext:
    getContext: contains big object responsible for drawing out objects
    fillRect: create rectangle (x position, y position, width, height)
    fillStyle: apply style to canvas
    drawImage: display image source into canvas (html image, dx, dy) 
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
image.onload = () => {
  canvasContext.drawImage(image, -1700, -1050);
};
