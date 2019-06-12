/* eslint-disable prefer-destructuring */
class Frame {
  constructor() {
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 256, 256);

    const previousActiveShot = document.querySelector('.active-frame');
    if (previousActiveShot) {
      previousActiveShot.className = 'frame';
    }
    const shots = document.querySelector('.shots');
    const nextShot = document.createElement('canvas');
    nextShot.width = 128;
    nextShot.height = 128;
    nextShot.className = 'frame active-frame';
    const shotsWrapper = document.createElement('div');
    shotsWrapper.className = 'frame-wrap';
    shots.appendChild(shotsWrapper);
    shotsWrapper.appendChild(nextShot);

    const deleteBTN = document.createElement('button');
    deleteBTN.className = 'delete-frame';
    shotsWrapper.appendChild(deleteBTN);
    deleteBTN.addEventListener('click', this.destroy);

    const copyBTN = document.createElement('button');
    copyBTN.className = 'copy-frame';
    shotsWrapper.appendChild(copyBTN);

    copyBTN.addEventListener('click', this.copy);
  }

  destroy(e) {
    const paintField = document.querySelector('.paint-field');
    const paintFieldContext = paintField.getContext('2d');
    e.target.parentNode.remove();
    const previousFrames = document.querySelectorAll('.frame');
    if (previousFrames) {
      previousFrames[previousFrames.length - 1].className = 'frame active-frame';
    }
    const previousFrameImage = previousFrames[previousFrames.length - 1];
    paintFieldContext.clearRect(0, 0, 128, 128);
    paintFieldContext.drawImage(previousFrameImage, 0, 0);
    console.log('УСТРОЙ ДЕСТРОЙ');
  }

  copy(e) {
    // eslint-disable-next-line no-unused-vars
    const copyredFrame = new Frame();
    const copyredCanvas = document.querySelector('.active-frame');
    const context = copyredCanvas.getContext('2d');
    const image = e.target.parentNode.firstChild;
    const paintField = document.querySelector('.paint-field');
    const paintFieldContext = paintField.getContext('2d');
    context.drawImage(image, 0, 0, paintField.width, paintField.height, 0, 0, 128, 128, 0, 0);
    paintFieldContext.drawImage(image, 0, 0, paintField.width, paintField.height);
  }
}
export default class CreatePictures {
  constructor() {
    // eslint-disable-next-line no-unused-vars
    const initFirstFrame = new Frame();
    this.speed = 0;
    this.paintFieldSize = 0;
  }

  framesUpdateListener() {
    const canvas = document.querySelector('.paint-field');
    canvas.addEventListener('mouseup', this.getFrame);
  }

  getFrame() {
    const frame = document.querySelector('.active-frame');
    const context = frame.getContext('2d');
    const image = document.querySelector('.paint-field');

    context.drawImage(image, 0, 0, image.width, image.width, 0, 0, 128, 128);
  }

  // addShot() {
  //   this.clearCanvasField();
  //   const previousActiveShot = document.querySelector('.active-frame');
  //   if (previousActiveShot) {
  //     previousActiveShot.className = 'frame';
  //   }

  //   const shots = document.querySelector('.shots');
  //   const nextShot = document.createElement('canvas');
  //   nextShot.width = 128;
  //   nextShot.height = 128;
  //   nextShot.className = 'frame active-frame';
  //   const shotsWrapper = document.createElement('div');
  //   shotsWrapper.className = 'frame-wrap';
  //   shots.appendChild(shotsWrapper);
  //   shotsWrapper.appendChild(nextShot);

  //   const deleteBTN = document.createElement('button');
  //   deleteBTN.className = 'delete-frame';
  //   shotsWrapper.appendChild(deleteBTN);

  //   deleteBTN.addEventListener('click', (e) => {
  //     e.target.parentNode.remove();
  //   });

  //   const copyBTN = document.createElement('button');
  //   copyBTN.className = 'copy-frame';
  //   shotsWrapper.appendChild(copyBTN);

  //   copyBTN.addEventListener('click', (e) => {
  //     // console.log(e.target.parentNode.firstChild);
  //     this.addCloneShot();
  //     const copyredCanvas = document.querySelector('.active-frame');
  //     const context = copyredCanvas.getContext('2d');
  //     const image = e.target.parentNode.firstChild;
  //     context.drawImage(image, 0, 0);

  //     const paintField = document.querySelector('.paint-field');
  //     const paintFieldContext = paintField.getContext('2d');
  //     console.log(image.width);
  //     paintFieldContext.drawImage(image, 0, 0, 128, 128, 0, 0, 256, 256, 0, 0);
  //   });
  // }

  addCloneShot() {
    this.addShot();
  }

  clearCanvasField() {
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 256, 256);
  }

  initAddShotButton() {
    const addShotButton = document.querySelector('.add-frame-tool');
    // addShotButton.addEventListener('click', this.addShot.bind(this));
    // eslint-disable-next-line no-new
    addShotButton.addEventListener('click', () => { new Frame(); });
  }

  startAnimation() {
    let count = 0;
    const animation = document.querySelector('.animation');
    const context = animation.getContext('2d');
    const inputRange = document.querySelector('.speed');

    const start = () => {
      if (this.speed > 0) {
        const frames = [...document.querySelector('.shots').children];
        context.clearRect(0, 0, 128, 128);
        context.drawImage(frames[count % frames.length].firstElementChild, 0, 0);
        count += 1;
      }
    };
    let timer = setInterval(() => start(), 1000 / Number(this.speed));

    inputRange.addEventListener('input', () => {
      this.speed = inputRange.value;
      clearInterval(timer);
      timer = setInterval(() => start(), 1000 / Number(this.speed));
      const labelAnimation = document.querySelector('.current-speed');
      labelAnimation.innerHTML = `${this.speed} FPS`;
    });
  }

  setFullscreen() {
    const fullscreenButton = document.querySelector('.fullscreen-tool');
    fullscreenButton.addEventListener('click', () => {
      const canvasAnimation = document.querySelector('.animation');
      canvasAnimation.requestFullscreen();
    });
  }

  changeFieldSize() {
    const paintField = document.querySelector('.paint-field');
    const sizeChangerBlock = document.querySelector('.canvas-size ');

    const resizeButton = document.querySelector('.canvas-size-tool');
    const sizeField = document.querySelector('.canvas-size');
    resizeButton.addEventListener('click', () => {
      sizeField.classList.toggle('hide');
    });

    const updateCanvasInfo = (param) => {
      const infoField = document.querySelector('.size');
      infoField.innerText = `[${param}x${param}]`;
      this.paintFieldSize = param;
    };

    const buttonsListener = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'small':
              paintField.width = 32;
              paintField.height = 32;
              updateCanvasInfo(32);
              break;
            case 'medium':
              paintField.width = 64;
              paintField.height = 64;
              updateCanvasInfo(64);
              break;
            case 'large':
              paintField.width = 128;
              paintField.height = 128;
              updateCanvasInfo(128);
              break;
            default:
              return;
          }
          return;
        }
        target = target.parentNode;
      }
    };
    sizeChangerBlock.addEventListener('click', buttonsListener);
  }
}
