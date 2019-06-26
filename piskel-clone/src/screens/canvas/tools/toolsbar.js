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

    // const listener = new window.keypress.Listener();
    // listener.simple_combo('shift s', () => {
    //   console.log('You pressed shift and s');
    // });
  }

  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.paint-field');
    const context = canvas.getContext('2d');
    const currentToolsListeners = {};
    console.log(this.pixelWidth);
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
        const activeFrame = document.querySelector('.active-frame');
        const activeFrameContext = activeFrame.getContext('2d');
        activeFrameContext.clearRect(0, 0, 128, 128);
        context.clearRect(Math.ceil(x / this.pixelWidth) * this.pixelWidth,
          Math.ceil(y / this.pixelWidth) * this.pixelWidth, this.pixelWidth, this.pixelWidth);
      }
    };

    const pen = (eraser = 0) => {
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
        document.body.style.cursor = "url('../../../src/screens/canvas/images/pencil-edit-button.png'), auto";
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

    const mirrorPen = (eraser = 0) => {
      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;
      let deltaX = 0;
      let deltaY = 0;
      let isMouseDown = false;

      const startDrawing = (e) => {
        isMouseDown = true;
        [x1, y1] = [Math.abs(canvas.width - e.offsetX), e.offsetY];
      };

      const stopDrawing = () => {
        isMouseDown = false;
      };

      const drawLine = (e) => {
        if (!isMouseDown) return;
        [x2, y2] = [Math.abs(canvas.width - e.offsetX), e.offsetY];
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

    const rectangle = () => {
      let x = 0;
      let y = 0;
      let width = 0;
      let height = 0;
      let isMouseDown = false;
      const primaryColor = document.querySelector('.primary');
      context.fillStyle = primaryColor;

      const startDrawing = (e) => {
        isMouseDown = true;
        [x, y] = [e.offsetX, e.offsetY];
      };

      const stopDrawing = () => {
        isMouseDown = false;
      };

      const drawLine = (e) => {
        if (isMouseDown) {
          context.clearRect(x, y, width, height);
          context.beginPath();
          context.lineWidth = this.pixelWidth;
          console.log(this.pixelWidth);
          width = e.offsetX - x;
          height = e.offsetY - y;
          context.fillRect(x, y, width, height);
          // context.rect(x, y, width, height);
          // context.stroke();
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

    const secondRectangle = () => {

    };

    // const circle = () => {
    //   let x0 = 0;
    //   let y0 = 0;
    //   let isMouseDown = false;
    //   let R = 0;
    //   let x = 0;
    //   let y = 0;
    //   let delta = 1 - 2 * R;
    //   let error = 0;

    //   const startDrawing = (e) => {
    //     isMouseDown = true;
    //     [x0, y0] = [e.offsetX, e.offsetY];
    //   };

    //   const stopDrawing = () => {
    //     isMouseDown = false;
    //   };

    //   const drawCircle = (e) => {
    //     if (!isMouseDown) return;
    //     [x, y] = [e.offsetX, e.offsetY];
    //     R = x - x0;
    //     delta = 1 - 2 * R;
    //     while (y0 >= 0) {
    //       drawPixel(x + x0, y + y0);
    //       drawPixel(x + x0, y - y0);
    //       drawPixel(x - x0, y + y0);
    //       drawPixel(x - x0, y - y0);
    //       error = 2 * (delta + y0) - 1;
    //       if (delta < 0 && error <= 0) {
    //         x0++;
    //         delta += 2 * x0 + 1;
    //         continue;
    //       }
    //       if (delta > 0 && error > 0) {
    //         y0--;
    //         delta -= 2 * y0 + 1;
    //         continue;
    //       }
    //       x0++;
    //       delta += 2 * (x0 - y0);
    //       y0--;
    //     }
    //   };
    //   canvas.addEventListener('mousedown', startDrawing);
    //   canvas.addEventListener('mousemove', drawCircle);
    //   canvas.addEventListener('mouseup', stopDrawing);
    //   canvas.addEventListener('mouseout', stopDrawing);
    // };
    // const drawPix = (x, y) => {
    //   console.log('drawing!');
    //   const primaryColor = document.querySelector('.primary');
    //   context.fillStyle = primaryColor.value;
    //   context.fillRect(x, y, 1, 1);
    // };

    // const brethCircle = () => {
    //   let x0;
    //   let y0;
    //   let x;
    //   let y;
    //   let gap;
    //   let radius;
    //   // eslint-disable-next-line no-unused-vars
    //   let isMouseDown = false;

    //   const startDrawing = (e) => {
    //     isMouseDown = true;
    //     [x0, y0] = [e.offsetX, e.offsetY];
    //   };

    //   const stopDrawing = () => {
    //     isMouseDown = false;
    //   };

    //   const drawCircle = (e) => {
    //     [x, y] = [e.offsetX, e.offsetY];
    //     radius = x - x0;
    //     y0 = radius;
    //     let delta = (2 - 2 * radius);
    //     while (y0 >= 0) {
    //       drawPix(x + x0, y - y0);
    //       drawPix(x - x0, y - y0);
    //       drawPix(x - x0, y + y0);
    //       drawPix(x + x0, y + y0);
    //       gap = 2 * (delta + y0) - 1;
    //       if (delta < 0 && gap <= 0) {
    //         x0++;
    //         delta += 2 * x0 + 1;
    //         continue;
    //       }
    //       if (delta > 0 && gap > 0) {
    //         y0--;
    //         delta -= 2 * y0 + 1;
    //         continue;
    //       }
    //       x0++;
    //       delta += 2 * (x0 - y0);
    //       y0--;
    //     }
    //   };
    //   canvas.addEventListener('mousedown', startDrawing);
    //   canvas.addEventListener('mousemove', drawCircle);
    //   canvas.addEventListener('mouseup', stopDrawing);
    //   canvas.addEventListener('mouseout', stopDrawing);

    //   addFunctionsInState('mousedown', startDrawing);
    //   addFunctionsInState('mousemove', drawCircle);
    //   addFunctionsInState('mouseup', stopDrawing);
    //   addFunctionsInState('mouseout', stopDrawing);
    // };

    const swapColor = () => {
      const primaryColor = document.querySelector('.primary');
      const secondaryColor = document.querySelector('.secondary');
      const temp = primaryColor.value;
      primaryColor.value = secondaryColor.value;
      secondaryColor.value = temp;
    };

    // const testCircle = () => {
    //   console.log('Запуск круга');
    //   let isMouseDown = false;
    //   let x = 0;
    //   let y = 0;

    //   const startDrawing = (e) => {
    //     [x, y] = [e.offsetX, e.offsetY];
    //     console.log('START CIRCLE');
    //   };

    //   const drawLine = () => {
    //     if (!isMouseDown) return;
    //     isMouseDown = true;
    //     context.beginPath();
    //     context.arc(x, y, 10, 0, 2 * Math.PI, false);
    //     context.fillStyle = 'green';
    //     context.fill();
    //     context.lineWidth = 5;
    //     context.strokeStyle = '#003300';
    //     context.stroke();
    //   };

    //   const stopDrawing = () => {
    //     isMouseDown = false;
    //   };

    //   canvas.addEventListener('mousedown', startDrawing);
    //   canvas.addEventListener('mousemove', drawLine);
    //   canvas.addEventListener('mouseup', stopDrawing);
    //   canvas.addEventListener('mouseout', stopDrawing);
    // };

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

    // ////////////////////////////////// PAINT

    // const getPixelPos = (x, y) => (y * canvas.width + x) * 4;

    // const matchStartColor = (data, pos, startColor) => (data[pos] === startColor.r && data[pos + 1] === startColor.g && data[pos + 2] === startColor.b && data[pos + 3] === startColor.a);

    // const colorPixel = (data, pos, color) => {
    //   data[pos] = color.r || 0;
    //   data[pos + 1] = color.g || 0;
    //   data[pos + 2] = color.b || 0;
    //   // eslint-disable-next-line no-prototype-builtins
    //   data[pos + 3] = color.hasOwnProperty('a') ? color.a : 255;
    // };

    // const floodFill = (startX, startY, fillColor) => {
    //   // var srcImg = ctx.getImageData(0,0,canvas.width,canvas.height);
    //   // var srcData = srcImg.data;
    //   const dstImg = context.getImageData(0, 0, canvas.width, canvas.height);
    //   const dstData = dstImg.data;

    //   const startPos = getPixelPos(startX, startY);
    //   const startColor = {
    //     r: dstData[startPos],
    //     g: dstData[startPos + 1],
    //     b: dstData[startPos + 2],
    //     a: dstData[startPos + 3],
    //   };
    //   const todo = [
    //     [startX, startY],
    //   ];

    //   while (todo.length) {
    //     const pos = todo.pop();
    //     const x = pos[0];
    //     let y = pos[1];
    //     let currentPos = getPixelPos(x, y);

    //     while ((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
    //       currentPos -= canvas.width * 4;
    //     }

    //     currentPos += canvas.width * 4;
    //     ++y;
    //     let reachLeft = false;
    //     let reachRight = false;

    //     while ((y++ < canvas.height - 1) && matchStartColor(dstData, currentPos, startColor)) {
    //       colorPixel(dstData, currentPos, fillColor);

    //       if (x > 0) {
    //         if (matchStartColor(dstData, currentPos - 4, startColor)) {
    //           if (!reachLeft) {
    //             todo.push([x - 1, y]);
    //             reachLeft = true;
    //           }
    //         } else if (reachLeft) {
    //           reachLeft = false;
    //         }
    //       }

    //       if (x < canvas.width - 1) {
    //         if (matchStartColor(dstData, currentPos + 4, startColor)) {
    //           if (!reachRight) {
    //             todo.push([x + 1, y]);
    //             reachRight = true;
    //           }
    //         } else if (reachRight) {
    //           reachRight = false;
    //         }
    //       }

    //       currentPos += canvas.width * 4;
    //     }
    //   }

    //   context.putImageData(dstImg, 0, 0);
    // };


    // ////////////////////////////////// PAINT

    // eslint-disable-next-line func-names
    // canvas.onclick = function (e) {
    //   const startX = e.offsetX;
    //   const startY = e.offsetY;
    //   floodFill(startX, startY, {
    //     r: 255,
    //   });
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
              pen();
              break;
            case 'eraser':
              clearCurrentState();
              pen(1);
              break;
            case 'mirror-pen-tool':
              console.log('mirror pen');
              clearCurrentState();
              pen();
              mirrorPen();
              break;
            case 'pen-tool-test':
              console.log('circle');
              clearCurrentState();
              // swapperTest();
              // circle();
              // brethCircle();
              // testCircle();
              break;
            case 'bucket-tool':
              console.log('bucket-tool');
              // paintBucket();
              // testBucket();
              break;
            case 'rectangle-tool':
              console.log('rec');
              rectangle();
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

// function move() {
//   document.body.style.cursor = "url('./assets/move.png'), auto";
//   var tempValue = null;

//   function handleDragStart(e) {
//     tempValue = this;
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/html', window.getComputedStyle(this).order);
//   }

//   function handleDragOver(e) {
//     if (e.preventDefault) {
//       e.preventDefault();
//     }
//     e.dataTransfer.dropEffect = 'move';
//     return false;
//   }

//   function handleDragEnter() {
//     this.classList.add('over');
//   }

//   function handleDragLeave() {
//     this.classList.remove('over');
//   }

//   function handleDrop(e) {
//     if (e.stopPropagation) {
//       e.stopPropagation();
//     }
//     if (tempValue != this) {
//       tempValue.style.order = window.getComputedStyle(this).order;
//       let prevBlockId = tempValue.id;
//       state.order[prevBlockId] = window.getComputedStyle(this).order;
//       e.target.style.order = e.dataTransfer.getData('text/html');
//       let currentBlockId = e.target.id;
//       state.order[currentBlockId] = e.dataTransfer.getData('text/html');

//       updateStateInLocalStorage();
//     }

//     return false;
//   }

//   function handleDragEnd() {

//     [].forEach.call(cols, function (col) {
//       col.classList.remove('over');
//     });
//   }

//   var cols = document.querySelectorAll('.square');

//   [].forEach.call(cols, function (col) {
//     col.addEventListener('dragstart', handleDragStart, false);
//     col.addEventListener('dragenter', handleDragEnter, false);
//     col.addEventListener('dragover', handleDragOver, false);
//     col.addEventListener('dragleave', handleDragLeave, false);
//     col.addEventListener('drop', handleDrop, false);
//     col.addEventListener('dragend', handleDragEnd, false);
//   });

//   document.addEventListener('keyup', (e) => {
//     if (e.keyCode == "27") {
//       [].forEach.call(cols, function (col) {
//         col.removeEventListener('dragstart', handleDragStart, false);
//         col.removeEventListener('dragenter', handleDragEnter, false);
//         col.removeEventListener('dragover', handleDragOver, false);
//         col.removeEventListener('dragleave', handleDragLeave, false);
//         col.removeEventListener('drop', handleDrop, false);
//         col.removeEventListener('dragend', handleDragEnd, false);
//       });
//       document.body.style.cursor = "";
//     }
//   })
// }
