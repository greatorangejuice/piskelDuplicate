export default class CreatePictures {
  initCanvas() {
    const canvas = document.querySelector('.canvas');
    canvas.width = 256;
    canvas.height = 256;
    canvas.addEventListener('mouseup', this.getFrame);
  }

  getFrame() {
    const canvas = document.querySelector('.active-frame');
    const context = canvas.getContext('2d');

    const image = document.querySelector('.canvas');
    context.drawImage(image, 0, 0, 256, 256, 0, 0, 128, 128);
  }

  addShot() {
    this.clearCanvasField();
    const previousActiveShot = document.querySelector('.active-frame');
    previousActiveShot.className = 'frame';
    const shots = document.querySelector('.shots');
    const nextShot = document.createElement('canvas');
    nextShot.width = 128;
    nextShot.height = 128;
    nextShot.className = 'frame active-frame';
    shots.appendChild(nextShot);
  }

  clearCanvasField() {
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 256, 256);
  }

  initAddShotButton() {
    const addShotButton = document.querySelector('.add-frame-tool');
    addShotButton.addEventListener('click', this.addShot.bind(this));
  }

  startAnimation() {
    let count = 0;
    const animation = document.querySelector('.animation');
    const context = animation.getContext('2d');

    setInterval(() => {
      const frames = [...document.querySelector('.shots').children];
      context.clearRect(0, 0, 128, 128);
      context.drawImage(frames[count], 0, 0);
      count = count === frames.length - 1 ? 0 : count + 1;
    }, 1000 / 3);
  }
}
