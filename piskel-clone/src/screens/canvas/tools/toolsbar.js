/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
export default class Tools {
  constructor() {
    // const canvas = document.querySelector('.paint-field');
    // this.currentPaintFieldWidth = canvas.width;
    const sizeButton = document.querySelector('.line-size-tool');
    const pixelWidthInput = document.querySelector('.pixel-size');
    this.pixelWidth = 4;
    pixelWidthInput.addEventListener('input', () => {
      this.pixelWidth = pixelWidthInput.value;
      sizeButton.innerText = `${this.pixelWidth}`;
    });

    const inputRange = document.querySelector('.pixel-size');
    sizeButton.addEventListener('click', () => {
      inputRange.classList.toggle('hide');
      sizeButton.innerText = 'Pen size';
    });
  }

  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    const currentToolsListeners = {};

    const addFunctionsInState = (event, func) => {
      currentToolsListeners[event] = func;
    };

    const clearCurrentState = () => {
      Object.keys(currentToolsListeners).forEach((key) => {
        canvas.removeEventListener(key, currentToolsListeners[key]);
        Object.keys(currentToolsListeners).forEach((value) => {
          delete currentToolsListeners[value];
        });
      });
      // Добавить удаление класса active или что-нибудь подобного.
    };

    const getTriangle = () => {
      console.log('triangle-tool');
    };
    // const paintBucket = () => {
    //   const test = context.getImageData(0, 0, 128, 128);
    //   console.log(test.data);
    // };
    const clearField = () => {
      const activeFrame = document.querySelector('.active-frame');
      const frameContext = activeFrame.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      frameContext.clearRect(0, 0, activeFrame.width, activeFrame.height);
    };

    const drawPixel = (x, y, eraser) => {
      const primaryColor = document.querySelector('.primary');
      context.fillStyle = primaryColor.value;
      if (eraser === 0) {
        context.fillRect(Math.ceil(x / this.pixelWidth) * this.pixelWidth,
          Math.ceil(y / this.pixelWidth) * this.pixelWidth, this.pixelWidth, this.pixelWidth);
      } else if (eraser === 1) {
        context.clearRect(Math.ceil(x / this.pixelWidth) * this.pixelWidth,
          Math.ceil(y / this.pixelWidth) * this.pixelWidth, this.pixelWidth, this.pixelWidth);
      }
    };

    const brethPen = (eraser = 0) => {
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
      };

      const stopDrawing = () => {
        isMouseDown = false;
      };

      const drawLine = (e) => {
        if (!isMouseDown) return;
        [x2, y2] = [e.offsetX, e.offsetY];
        deltaX = Math.abs(x2 - x1);
        deltaY = Math.abs(y2 - y1);
        const signX = x1 < x2 ? 1 : -1;
        const signY = y1 < y2 ? 1 : -1;
        let error = deltaX - deltaY;
        drawPixel(x2, y2, eraser);

        while (x1 !== x2 || y1 !== y2) {
          drawPixel(x1, y1, eraser);
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

      addFunctionsInState('mousedown', startDrawing);
      addFunctionsInState('mousemove', drawLine);
      addFunctionsInState('mouseup', stopDrawing);
      addFunctionsInState('mouseout', stopDrawing);
    };

    // const circle = () => {
    //   let x1 = 0;
    //   let y1 = 0;
    //   let isMouseDown = false;
    //   let R = 0;
    //   let x2 = 0;
    //   let y2 = 0;
    //   let delta = 1 - 2 * R;
    //   let error = 0;

    //   const startDrawing = (e) => {
    //     isMouseDown = true;
    //     [x1, y1] = [e.offsetX, e.offsetY];
    //   };

    //   const stopDrawing = () => {
    //     isMouseDown = false;
    //   };

    //   const drawCircle = (e) => {
    //     if (!isMouseDown) return;
    //     [x2, y2] = [e.offsetX, e.offsetY];
    //     R = x2 - x1;
    //     delta = 1 - 2 * R;
    //     while (y2 >= 0) {
    //       drawPixel(x1 + 2, y1 + y2);
    //       drawPixel(x1 + 2, y1 - y2);
    //       drawPixel(x1 - 2, y1 + y2);
    //       drawPixel(x1 - 2, y1 - y2);
    //       error = 2 * (delta + y2) - 1;
    //       while ((delta < 0) && (error <= 0)) {
    //         delta += 2 * ++x2 + 1;
    //       }
    //       while ((delta > 0) && (error > 0)) {
    //         delta -= 2 * --y2 + 1;
    //       }
    //       delta += 2 * (++x2 - y2--);
    //     }
    //   };
    //   canvas.addEventListener('mousedown', startDrawing);
    //   canvas.addEventListener('mousemove', drawCircle);
    //   canvas.addEventListener('mouseup', stopDrawing);
    //   canvas.addEventListener('mouseout', stopDrawing);
    // };

    const swapColor = () => {
      const primaryColor = document.querySelector('.primary');
      const secondaryColor = document.querySelector('.secondary');
      const temp = primaryColor.value;
      primaryColor.value = secondaryColor.value;
      secondaryColor.value = temp;
    };

    // const testBucket = (e) => {
    //   const colorLayer = context.getImageData(0, 0, canvas.width, canvas.height);

    //   const matchStartColor = (pixelPos) => {
    //     const r = colorLayer.data[pixelPos];
    //     const g = colorLayer.data[pixelPos + 1];
    //     const b = colorLayer.data[pixelPos + 2];

    //     return (r === startR && g === startG && b === startB);
    //   };

    //   const colorPixel = (pixelPos) => {
    //     colorLayer.data[pixelPos] = fillColorR;
    //     colorLayer.data[pixelPos + 1] = fillColorG;
    //     colorLayer.data[pixelPos + 2] = fillColorB;
    //     colorLayer.data[pixelPos + 3] = 255;
    //   };

    //   const pixelStack = [
    //     [e.offsetX, e.offsetY],
    //   ];

    //   while (pixelStack.length) {
    //     let pixelPos;
    //     let reachLeft;
    //     let reachRight;
    //     const newPos = pixelStack.pop();
    //     const x = newPos[0];
    //     let y = newPos[1];

    //     pixelPos = (y * canvas.width + x) * 4;
    //     while (y-- >= drawingBoundTop && matchStartColor(pixelPos)) {
    //       pixelPos -= canvas.width * 4;
    //     }
    //     pixelPos += canvas.width * 4;
    //     ++y;
    //     reachLeft = false;
    //     reachRight = false;
    //     while (y++ < canvas.height - 1 && matchStartColor(pixelPos)) {
    //       colorPixel(pixelPos);

    //       if (x > 0) {
    //         if (matchStartColor(pixelPos - 4)) {
    //           if (!reachLeft) {
    //             pixelStack.push([x - 1, y]);
    //             reachLeft = true;
    //           }
    //         } else if (reachLeft) {
    //           reachLeft = false;
    //         }
    //       }

    //       if (x < canvas.width - 1) {
    //         if (matchStartColor(pixelPos + 4)) {
    //           if (!reachRight) {
    //             pixelStack.push([x + 1, y]);
    //             reachRight = true;
    //           }
    //         } else if (reachRight) {
    //           reachRight = false;
    //         }
    //       }

    //       pixelPos += canvas.width * 4;
    //     }
    //   }
    //   context.putImageData(colorLayer, 0, 0);
    // };

    const getActionButtons = (e) => {
      const target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'pen-tool':
              console.log('pen-tool');
              clearCurrentState();
              brethPen();
              break;
            case 'eraser':
              clearCurrentState();
              brethPen(1);
              break;
            case 'pen-tool-test':
              console.log('circle');
              // circle();
              clearCurrentState();
              break;
            case 'bucket-tool':
              console.log('bucket-tool');
              // paintBucket();
              // testBucket();
              break;
            case 'triangle-tool':
              getTriangle();
              break;
            case 'trash-tool':
              console.log('clearField');
              clearField();
              clearCurrentState();
              break;
            case 'swap-color':
              console.log('swap color');
              swapColor();
              break;
            default:
              return;
          }
          return;
        }
        return;
      }
    };
    canvasTools.addEventListener('click', getActionButtons);
  }
}

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
