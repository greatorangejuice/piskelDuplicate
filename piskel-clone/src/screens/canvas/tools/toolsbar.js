/* eslint-disable prefer-destructuring */
export default class Tools {
  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    // const ctx = canvas.getContext('2d');
    // const frame = new GetInitialCanvas();

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
          context.beginPath();
          context.moveTo(x, y); // * 10 = 3d tube
          // context.lineTo(newX, newY);
          // context.fillRect(newX, newY, 10, 10);

          // console.log(`newX: ${newX}, ceilX: ${Math.ceil(newX / 10) * 10}`);
          context.fillRect(Math.ceil(newX / 4) * 4, Math.ceil(newY / 4) * 4, 4, 4);

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
      // frame.getFrame();
      console.log('paintBucket');
    };
    const clearField = () => {
      // context.clearRect(0, 0, canvas.width, canvas.height);
      const mycanvas = document.querySelector('.canvas');
      const width = mycanvas.offsetWidth;
      console.log(width);
    };

    const brethPen = () => {
      let startX = 0;
      let startY = 0;
      const finishX = 0;
      const finishY = 0;
      const isMouseDown = false;

      const startDrawing = (e) => {
        isMouseDown = true;
        [startX, startY] = [e.offsetX, e.offsetY];
      };

      const stopDrawing = (e) => {
        isMouseDown = false;

      }
    };

    const getActionButtons = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'pen-tool':
              console.log('pen-tool');
              // goPen();
              getPen();
              break;
            case 'pen-tool-test':
              console.log('pen-tool-test');
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
