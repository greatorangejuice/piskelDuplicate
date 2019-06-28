/* eslint-disable prefer-destructuring */
// import GIF from '../../../gifExporter/gif';

class Frame {
  // static counter = 1;
  constructor() {
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 256, 256);

    const previousActiveShot = document.querySelector('.active-frame');
    if (previousActiveShot) {
      previousActiveShot.classList.remove('active-frame');
    }
    const shots = document.querySelector('.shots');
    const nextShot = document.createElement('canvas');
    nextShot.width = 128;
    nextShot.height = 128;
    nextShot.classList.add('frame', ['active-frame']);
    const shotsWrapper = document.createElement('div');
    shotsWrapper.classList.add('frame-wrap');

    shotsWrapper.id = `frame${Frame.counter}`;
    shotsWrapper.style.order = Frame.counter;
    shotsWrapper.draggable = true;

    shots.appendChild(shotsWrapper);
    shotsWrapper.appendChild(nextShot);

    const deleteBTN = document.createElement('button');
    deleteBTN.classList.add('delete-frame');
    shotsWrapper.appendChild(deleteBTN);
    deleteBTN.addEventListener('click', this.destroy);

    const copyBTN = document.createElement('button');
    copyBTN.classList.add('copy-frame');
    shotsWrapper.appendChild(copyBTN);

    copyBTN.addEventListener('click', this.copy);
    Frame.counter += 1;
    this.tempValue = null;

    shotsWrapper.addEventListener('dragstart', this.handleDragStart.bind(shotsWrapper));
    shotsWrapper.addEventListener('dragenter', this.handleDragOver.bind(shotsWrapper));
    shotsWrapper.addEventListener('dragover', this.handleDragEnter.bind(shotsWrapper));
    shotsWrapper.addEventListener('dragleave', this.handleDragLeave.bind(shotsWrapper));
    shotsWrapper.addEventListener('mouseup', this.handleDrop.bind(shotsWrapper));
    shotsWrapper.addEventListener('dragend', this.handleDragEnd.bind(shotsWrapper));
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
  }

  copy(e) {
    new Frame();
    const copyredCanvas = document.querySelector('.active-frame');
    const context = copyredCanvas.getContext('2d');
    const image = e.target.parentNode.firstChild;
    const paintField = document.querySelector('.paint-field');
    const paintFieldContext = paintField.getContext('2d');
    context.drawImage(image, 0, 0, paintField.width, paintField.height, 0, 0, 128, 128, 0, 0);
    paintFieldContext.drawImage(image, 0, 0, paintField.width, paintField.height);
  }

  handleDragStart(e) {
    this.tempValue = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', window.getComputedStyle(this).order);
  }

  handleDragOver(e) {
    console.log('dragOver');
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  handleDragEnter() {
    // console.log('dragEnter');
    this.classList.add('over');
  }

  handleDragLeave() {
    // console.log('dragLeave');
    this.classList.remove('over');
  }

  handleDrop(e) {
    console.log('HANDLE DROP');
    // this/e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // e.dataTransfer.dropEffect = 'move';
    if (this.tempValue !== this) {
      this.tempValue.style.order = window.getComputedStyle(this).order;
      e.target.style.order = e.dataTransfer.getData('text/html');
    }
    return false;
  }

  handleDragEnd() {
    console.log('dragEnd');
    const frames = Array.from(document.querySelectorAll('.frame-wrap'));
    frames.forEach(frame => frame.classList.remove('over'));
  }
}
// STATIC FIELD
Frame.counter = 1;
export default class PictureCreator {
  constructor() {
    new Frame();
    this.speed = 0;
    this.paintFieldSize = 0;
  }

  init() {
    this.framesUpdateListener();
    this.initAddShotButton();
    this.startAnimation();
    this.setFullscreen();
    this.changeActiveFrame();
    this.changeFieldSize();
  }

  framesUpdateListener() {
    const paintField = document.querySelector('.paint-field');
    paintField.addEventListener('mouseup', this.getFrame);
    const sepiaFilter = document.querySelector('.sepia');
    sepiaFilter.addEventListener('mouseup', this.getFrame);
  }

  getFrame() {
    const frame = document.querySelector('.active-frame');
    const context = frame.getContext('2d');
    context.imageSmoothingEnabled = false;
    const image = document.querySelector('.paint-field');
    const imageContext = image.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.width, 0, 0, frame.width, frame.height);
    imageContext.drawImage(frame, 0, 0, image.width, image.width, 0, 0, frame.width, frame.height);
  }

  initAddShotButton() {
    const addShotButton = document.querySelector('.add-frame-tool');
    addShotButton.addEventListener('click', () => {
      new Frame();
    });
  }

  startAnimation() {
    let count = 0;
    const animation = document.querySelector('.animation');
    const context = animation.getContext('2d');
    context.imageSmoothingEnabled = false;
    const inputRange = document.querySelector('.speed');
    const frameCanvas = document.querySelector('.frame');

    const start = () => {
      if (this.speed > 0) {
        const frames = [...document.querySelector('.shots').children];
        context.clearRect(0, 0, animation.width, animation.height);
        context.drawImage(frames[count % frames.length].firstElementChild, 0, 0, frameCanvas.width, frameCanvas.height, 0, 0, animation.width, animation.height);
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

  changeActiveFrame() {
    const paintField = document.querySelector('.paint-field');
    const paintFieldcontext = paintField.getContext('2d');
    const framesBlock = document.querySelector('.shots');
    const func = (e) => {
      const target = e.target;
      while (target !== this) {
        if (target.tagName === 'CANVAS') {
          const previousActiveFrame = document.querySelector('.active-frame');
          e.target.className = 'frame active-frame';
          previousActiveFrame.className = 'frame';

          const currentActiveFrame = e.target;
          paintFieldcontext.clearRect(0, 0, paintField.width, paintField.height);
          paintFieldcontext.drawImage(currentActiveFrame, 0, 0);
          return;
        }
        return;
      }
    };
    framesBlock.addEventListener('click', func);
  }

  addLayer() {
    const activeFrameWrap = document.querySelector('.frame-wrap');
    const newLayer = document.createElement('canvas');
    newLayer.width = 128;
    newLayer.height = 128;
    activeFrameWrap.appendChild(newLayer);
    const context = newLayer.getContext('2d');
    context.fillRect(5, 5, 10, 10);
  }
}
