/*Sprite Class:
  props:
    position: x, y
    velocity
    image
  methods:
    draw: canvasContext.drawImage
*/
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, value: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    let { image, position, frames, moving } = this;
    canvasContext.drawImage(
      image,
      this.frames.value * this.width,
      0,
      image.width / frames.max,
      image.height,
      position.x,
      position.y,
      image.width / frames.max,
      image.height
    );

    if (!this.moving) return;

    if (frames.max > 1) {
      frames.elapsed++;
    }

    if (frames.elapsed % 10 === 0) {
      if (frames.value < frames.max - 1) {
        frames.value++;
      } else {
        frames.value = 0;
      }
    }
  }
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    canvasContext.fillStyle = "rgba(225, 0, 0, 0.0)";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
