/* eslint-disable prefer-destructuring */
import GIF from 'gif.js.optimized';

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
    this.dragSrcEl = null;
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
    this.addGifListener();
    this.trackFrameList();
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

  importGIF() {
    const frameCanvas = document.querySelectorAll('.frame');
    const FPS = document.querySelector('.speed');
    const gif = new GIF({
      workers: 2,
      workerScript: './gif.worker.js',
      quality: 10,
      repeat: 0,
      width: frameCanvas[0].width,
      height: frameCanvas[0].height,
      background: frameCanvas[0].style.background,
    });
    const save = document.querySelectorAll('.save')[0];
    for (let i = 0; i < frameCanvas.length; i += 1) {
      gif.addFrame(frameCanvas[i], { delay: FPS.value });
    }
    gif.on('finished', (blob) => {
      save.href = URL.createObjectURL(blob);
      save.innerHTML = 'Download';
      save.classList.add('link');
    });
    gif.render();
  }

  addGifListener() {
    const button = document.querySelector('.gif');
    button.addEventListener('click', this.importGIF);
  }

  dragStartHandler(event) {
    const { target } = event;
    target.style.opacity = '0.4';

    this.dragSrcEl = target;

    const e = event;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', window.getComputedStyle(target).order);
  }

  dragOverHandle(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    const e = event;
    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  dragEnterHandle(event) {
    const { target } = event;
    if (target.tagName.toLowerCase() === 'canvas') {
      target.closest('.frame-wrap').classList.add('over');
    }
  }

  dragLeaveHandle(event) {
    const { target } = event;
    if (target.tagName.toLowerCase() === 'canvas') {
      target.closest('.frame-wrap').classList.remove('over');
    }
  }

  dropHandle(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    const { target } = event;
    const element = target.closest('.frame-wrap');

    if (this.dragSrcEl !== element) {
      this.dragSrcEl.style.order = element.style.order;
      element.style.order = event.dataTransfer.getData('text/html');
    }

    return false;
  }

  dragEndHandle(event) {
    const over = document.querySelector('.over');
    if (over) {
      over.classList.remove('over');
    }

    const { target } = event;
    target.style.opacity = '';
  }

  trackFrameList() {
    const frameList = document.querySelector('.shots');
    frameList.addEventListener('dragstart', this.dragStartHandler);
    frameList.addEventListener('dragenter', this.dragEnterHandle);
    frameList.addEventListener('dragover', this.dragOverHandle);
    frameList.addEventListener('dragleave', this.dragLeaveHandle);
    frameList.addEventListener('drop', this.dropHandle);
    frameList.addEventListener('dragend', this.dragEndHandle);
  }
}
