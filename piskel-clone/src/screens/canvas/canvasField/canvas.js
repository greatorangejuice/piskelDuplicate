/* eslint-disable prefer-destructuring */
export default class CreatePictures {
  constructor() {
    this.speed = 0;
  }

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

    deleteBTN.addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });

    const copyBTN = document.createElement('button');
    copyBTN.className = 'copy-frame';
    shotsWrapper.appendChild(copyBTN);

    copyBTN.addEventListener('click', (e) => {
      // console.log(e.target.parentNode.firstChild);
      this.addCloneShot();
      const copyredCanvas = document.querySelector('.active-frame');
      const context = copyredCanvas.getContext('2d');
      const image = e.target.parentNode.firstChild;
      context.drawImage(image, 0, 0);

      const paintField = document.querySelector('.canvas');
      const paintFieldContext = paintField.getContext('2d');
      paintFieldContext.drawImage(image, 0, 0, 128, 128, 0, 0, 256, 256, 0, 0);
    });
  }

  addCloneShot() {
    this.addShot();
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
    const paintField = document.querySelector('.canvas');
    // const context = paintField.getContext('2d');
    const sizeChangerBlock = document.querySelector('.canvas-size ');

    const resizeButton = document.querySelector('.canvas-size-tool');
    const sizeField = document.querySelector('.canvas-size');
    resizeButton.addEventListener('click', () => {
      sizeField.classList.toggle('hide');
    });

    const buttonsListener = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'small':
              console.log('small');
              paintField.width = 320;
              paintField.height = 320;
              break;
            case 'medium':
              console.log('medium');
              paintField.width = 640;
              paintField.height = 640;
              break;
            case 'large':
              console.log('large');
              paintField.width = 320;
              paintField.height = 320;
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

// class Frame {
//   constructor(block) {

//   }

//  deleteShot() {

//  }
// }


// const val =
// button.addEventListener('click', )
