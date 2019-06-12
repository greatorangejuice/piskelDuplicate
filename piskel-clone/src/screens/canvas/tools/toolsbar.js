/* eslint-disable prefer-destructuring */
export default class Tools {
  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    // const ctx = canvas.getContext('2d');
    // const frame = new GetInitialCanvas();

    // const getPen = () => {
    //   context.lineCap = 'square';

    //   let x = 0;
    //   let y = 0;
    //   let isMouseDown = false;

    //   const stopDrawing = () => {
    //     isMouseDown = false;
    //   };
    //   const startDrawing = (event) => {
    //     isMouseDown = true;
    //     [x, y] = [event.offsetX, event.offsetY];
    //   };
    //   const drawLine = (event) => {
    //     if (isMouseDown) {
    //       const newX = event.offsetX;
    //       const newY = event.offsetY;
    //       context.beginPath();
    //       context.moveTo(x, y); // * 10 = 3d tube
    //       // context.lineTo(newX, newY);
    //       // context.fillRect(newX, newY, 10, 10);

    //       // console.log(`newX: ${newX}, ceilX: ${Math.ceil(newX / 10) * 10}`);
    //       context.fillRect(Math.ceil(newX / 4) * 4, Math.ceil(newY / 4) * 4, 4, 4);

    //       context.stroke();
    //       [x, y] = [newX, newY];
    //     }
    //   };

    //   canvas.addEventListener('mousedown', startDrawing);
    //   canvas.addEventListener('mousemove', drawLine);
    //   canvas.addEventListener('mouseup', stopDrawing);
    //   canvas.addEventListener('mouseout', stopDrawing);
    // };

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
      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;
      let deltaX = 0;
      let deltaY = 0;
      let isMouseDown = false;

      const startDrawing = (e) => {
        isMouseDown = true;
        [x1, y1] = [e.offsetX, e.offsetY];
        console.log(`x1: ${x1}, y1: ${y1}`);
      };

      const stopDrawing = () => {
        isMouseDown = false;
      };

      const drawPixel = (x, y) => {
        context.fillRect(Math.ceil(x / 4) * 4, Math.ceil(y / 4) * 4, 4, 4);
      };

      const drawLine = (e) => {
        console.log(isMouseDown);
        if (!isMouseDown) return;
        console.log('drawline');
        [x2, y2] = [e.offsetX, e.offsetY];
        deltaX = Math.abs(x2 - x1);
        deltaY = Math.abs(y2 - y1);
        const signX = x1 < x2 ? 1 : -1;
        const signY = y1 < y2 ? 1 : -1;
        let error = deltaX - deltaY;
        drawPixel(x2, y2);

        while (x1 !== x2 || y1 !== y2) {
          drawPixel(x1, y1);
          const error2 = error * 2;

          if (error2 > -deltaY) {
            error -= deltaY;
            x1 += signX;
          }

          if (error2 < deltaX) {
            error += deltaX;
            y1 += signY;
          }
        }
      };
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', drawLine);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
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
              // getPen();
              brethPen();
              break;
            // case 'pen-tool-test':
            //   console.log('pen-tool-test');
            //   brethPen();
            //   break;
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
