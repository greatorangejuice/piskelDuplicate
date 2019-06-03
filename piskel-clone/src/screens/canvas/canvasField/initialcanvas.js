/* eslint-disable prefer-destructuring */
export default class GetInitialCanvas {
  constructor() {
    this.shots = [];
  }

  getCanvas() {
    const canvas = document.querySelector('.canvas');
    canvas.width = 128;
    canvas.height = 128;
  }


  animateFrames(array) {
    const player = document.querySelector('.animated-canvas');
    for (let i = 0; i < array.length; i += 1) {
      const func = () => {
        player.style.backgroundImage = `url(${array[i]})`;
      };
      setTimeout(func, 2000);
    }
  }

  getFrame() {
    console.log(this.shots);
    const canvas = document.querySelector('canvas');
    const framesBar = document.querySelector('.frames-wrapper');

    const frame = document.createElement('div');
    frame.className = 'frame';
    framesBar.appendChild(frame);

    const counter = document.createElement('div');
    counter.className = 'frames-counter';
    counter.innerText = this.shots.length;
    frame.appendChild(counter);
    frame.setAttribute('counter', this.shots.length);
    frame.id = `${this.shots.length}`;

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

  setListeners() {
    const deleteTest = document.querySelector('.delete-frame');
    const getDeleteButtons = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'div') {
          console.log('test');
        }
        return;
      }
      target = target.parentnode;
    };
    deleteTest.addEventListener('click', getDeleteButtons);
  }
}
