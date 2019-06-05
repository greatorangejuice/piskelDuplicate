import Pen from './pen';

/* eslint-disable prefer-destructuring */
export default class Tools {
  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    const pen = new Pen();

    const getTriangle = () => {
      console.log('triangle-tool');
    };
    const changeSize = () => {
      canvas.style.width = `${32}px`;
      console.log('change size');
      ctx.scale(2, 2);
    };
    const paintBucket = () => {
      ctx.clearRect(0, 0, 512, 512);
    };


    const getActionButtons = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'pen-tool':
              console.log('pen-tool');
              pen.getPen();
              break;
            case 'bucket-tool':
              console.log('bucket-tool');
              paintBucket();
              break;
            case 'triangle-tool':
              getTriangle();
              break;
            case 'canvas-size-tool':
              changeSize();
              break;
            default:
              return;
          }
          return;
        }
        target = target.parentnode;
      }
    };
    canvasTools.addEventListener('click', getActionButtons);
  }
}
