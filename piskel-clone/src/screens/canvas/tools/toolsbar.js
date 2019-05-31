// import Pen from './pen';
import GetInitialCanvas from '../canvasField/initialcanvas';

/* eslint-disable prefer-destructuring */
export default class Tools {
  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    const frame = new GetInitialCanvas();

    const getPen = () => {
      context.lineCap = 'square';

      let x = 0;
      let y = 0;
      let isMouseDown = false;

      const stopDrawing = () => {
        isMouseDown = false;
      };
      const startDrawing = (event) => {
        isMouseDown = true;
        [x, y] = [event.offsetX, event.offsetY];
      };
      const drawLine = (event) => {
        if (isMouseDown) {
          const newX = event.offsetX;
          const newY = event.offsetY;
          // console.log(x, y);
          // console.log(newX, newY);
          context.beginPath();
          context.moveTo(x, y); // * 10 = 3d tube
          context.lineTo(newX, newY);
          context.stroke();
          [x, y] = [newX, newY];
        }
      };

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', drawLine);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
    };

    const getTriangle = () => {
      console.log('triangle-tool');
    };
    const changeSize = () => {
      canvas.style.width = `${32}px`;
      console.log('change size');
      context.scale(2, 2);
    };
    const paintBucket = () => {
      frame.getFrame();
    };
    const clearField = () => {
      // context.clearRect(0, 0, canvas.width, canvas.height);
      const mycanvas = document.querySelector('.canvas');
      const width = mycanvas.offsetWidth;
      console.log(width);
    };
    // const save = () => {
    //   // document.getElementById("canvasimg").style.border = "2px solid";
    //   let dataURL = canvas.toDataURL();
    //   document.getElementById("canvasimg").src = dataURL;
    //   document.getElementById("canvasimg").style.display = "inline";
    // }


    const getActionButtons = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'pen-tool':
              console.log('pen-tool');
              getPen();
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
            case 'trash-tool':
              clearField();
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
