export default class GetInitialCanvas {
  constructor() {
    this.shots = [];
  }

  getCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.width = 128;
    canvas.height = 128;
  }

  animateFrames(array) {
    const player = document.querySelector('.animated-canvas');
    for (let i = 0; i < array.length; i += 1) {
      const func = () => { player.style.backgroundImage = `url(${array[i]})`; };
      setTimeout(func, 2000);
    }
  }

  getFrame() {
    const canvas = document.querySelector('canvas');
    const framesBar = document.querySelector('.frames-wrapper');
    const frame = document.createElement('div');
    frame.className = 'frame';
    framesBar.appendChild(frame);
    const dataURL = canvas.toDataURL();
    frame.style.backgroundImage = `url(${dataURL})`;
    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete-frame';
    frame.appendChild(deleteButton);
    this.shots.push(dataURL);
    this.animateFrames(this.shots);
  }

  getFrameTools() {
    const addFrameButton = document.querySelector('.add-frame-tool');
    addFrameButton.addEventListener('click', this.getFrame.bind(this));
  }
}
