export default class GetInitialCanvas {
  constructor(scale) {
    this.scale = scale;
  }

  getCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.width = 256;
    canvas.height = 256;
  }

  getFrame() {
    const canvas = document.querySelector('canvas');
    const framesBar = document.querySelector('.frames-wrapper');
    const frame = document.createElement('img');
    frame.className = 'frame';
    framesBar.appendChild(frame);
    const dataURL = canvas.toDataURL();
    frame.src = dataURL;
  }
}
