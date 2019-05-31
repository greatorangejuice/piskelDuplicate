export default class GetInitialCanvas {
  getCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.width = 128;
    canvas.height = 128;
  }

  static animateFrames(array) {
    const player = document.querySelector('.animated-canvas');
    for (let i = 0; i < array.length; i += 1) {
      console.log('test');
      const func = () => { player.style.backgroundImage = `url(${array[i]})`; };
      setTimeout(func, 2000);
      if (i === array.length - 1) {
        i = 0;
        console.log('условие сработало');
      }
    }
    // player.style.backgroundImage = `url(${array[0]})`;
  }

  getFrame() {
    const canvas = document.querySelector('canvas');
    const framesBar = document.querySelector('.frames-wrapper');
    const frame = document.createElement('div');
    const shots = [];
    frame.className = 'frame';
    framesBar.appendChild(frame);
    const dataURL = canvas.toDataURL();
    frame.style.backgroundImage = `url(${dataURL})`;
    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete-frame';
    frame.appendChild(deleteButton);
    shots.push(dataURL);
    GetInitialCanvas.animateFrames(shots);
    console.log(this.shots);
  }

  getFrameTools() {
    const addFrameButton = document.querySelector('.add-frame-tool');
    addFrameButton.addEventListener('click', this.getFrame);
  }
}
