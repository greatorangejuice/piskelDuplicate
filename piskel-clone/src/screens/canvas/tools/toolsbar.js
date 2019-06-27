/* eslint-disable prefer-destructuring */
export default class Tools {
  constructor() {
    // const canvas = document.querySelector('.paint-field');
    // this.currentPaintFieldWidth = canvas.width;
    this.canvasTools = document.querySelector('.canvas-tools');
    this.canvas = document.querySelector('.paint-field');
    this.context = this.canvas.getContext('2d');
    this.currentToolsListeners = {};


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

  initKeyBinder() {
    const keyBinder = document.querySelector('.keybinder');
    const modalWindow = document.querySelector('.key-list');
    keyBinder.addEventListener('click', () => {
      modalWindow.classList.toggle('hide');
    });
  }

  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const getTriangle = () => {
      console.log('triangle-tool');
    };

    const getActionButtons = (e) => {
      const target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'pen-tool':
              this.clearCurrentState();
              this.pen();
              break;
            case 'eraser':
              this.clearCurrentState();
              this.pen(1);
              break;
            case 'mirror-pen-tool':
              this.clearCurrentState();
              this.mirrorPen();
              break;
            case 'circle':
              console.log('circle');
              this.clearCurrentState();
              this.circle();
              break;
            case 'bucket-tool':
              console.log('bucket-tool');
              // paintBucket();
              // testBucket();
              break;
            case 'rectangle-tool':
              this.clearCurrentState();
              this.rectangle();
              break;
            case 'second-rectangle-tool':
              this.clearCurrentState();
              this.emptyRectangle();
              break;
            case 'triangle-tool':
              getTriangle();
              break;
            case 'trash-tool':
              this.clearField();
              this.clearCurrentState();
              break;
            case 'swap-color':
              this.swapColor();
              break;
            case 'zoom':
              console.log('zoom');
              this.zoom();
              break;
            case 'move':
              console.log('move');
              this.clearCurrentState();
              this.move();
              break;
            case 'pipette':
              console.log('pipette');
              break;
            case 'bright':
              this.clearCurrentState();
              this.bright();
              console.log('bright');
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

  zoom() {
    console.log('Zooom me!');
  }

  drawPixel(x, y, eraser = 0) {
    const primaryColor = document.querySelector('.primary');
    this.context.fillStyle = primaryColor.value;
    if (eraser === 0) {
      this.context.fillRect(Math.ceil(x / this.pixelWidth) * this.pixelWidth,
        Math.ceil(y / this.pixelWidth) * this.pixelWidth, this.pixelWidth, this.pixelWidth);
    } else if (eraser === 1) {
      const activeFrame = document.querySelector('.active-frame');
      const activeFrameContext = activeFrame.getContext('2d');
      activeFrameContext.clearRect(0, 0, 128, 128);
      this.context.clearRect(Math.ceil(x / this.pixelWidth) * this.pixelWidth,
        Math.ceil(y / this.pixelWidth) * this.pixelWidth, this.pixelWidth, this.pixelWidth);
    }
  }

  pen(eraser = 0, mirror = 0) {
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    let deltaX = 0;
    let deltaY = 0;
    let isMouseDown = false;

    const startDrawing = (e) => {
      isMouseDown = true;
      if (mirror) {
        [x1, y1] = [Math.abs(this.canvas.width - e.offsetX), e.offsetY];
      } else {
        [x1, y1] = [e.offsetX, e.offsetY];
      }
    };

    const stopDrawing = () => {
      isMouseDown = false;
    };

    const drawLine = (e) => {
      if (!isMouseDown) return;
      if (mirror) {
        [x2, y2] = [Math.abs(this.canvas.width - e.offsetX), e.offsetY];
      } else {
        [x2, y2] = [e.offsetX, e.offsetY];
      }
      deltaX = Math.abs(x2 - x1);
      deltaY = Math.abs(y2 - y1);
      const signX = x1 < x2 ? 1 : -1;
      const signY = y1 < y2 ? 1 : -1;
      let error = deltaX - deltaY;
      this.drawPixel(x2, y2, eraser);

      while (x1 !== x2 || y1 !== y2) {
        this.drawPixel(x1, y1, eraser);
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
    this.canvas.addEventListener('mousedown', startDrawing);
    this.canvas.addEventListener('mousemove', drawLine);
    this.canvas.addEventListener('mouseup', stopDrawing);
    this.canvas.addEventListener('mouseout', stopDrawing);

    this.addFunctionsInState('mousedown', startDrawing);
    this.addFunctionsInState('mousemove', drawLine);
    this.addFunctionsInState('mouseup', stopDrawing);
    this.addFunctionsInState('mouseout', stopDrawing);
  }

  mirrorPen() {
    this.pen();
    this.pen(0, 1);
  }

  swapColor() {
    const primaryColor = document.querySelector('.primary');
    const secondaryColor = document.querySelector('.secondary');
    const temp = primaryColor.value;
    primaryColor.value = secondaryColor.value;
    secondaryColor.value = temp;
  }

  clearField() {
    const activeFrame = document.querySelector('.active-frame');
    const frameContext = activeFrame.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    frameContext.clearRect(0, 0, activeFrame.width, activeFrame.height);
  }

  addFunctionsInState(event, func) {
    this.currentToolsListeners[event] = func;
  }

  clearCurrentState() {
    Object.keys(this.currentToolsListeners).forEach((key) => {
      this.canvas.removeEventListener(key, this.currentToolsListeners[key]);
      Object.keys(this.currentToolsListeners).forEach((value) => {
        delete this.currentToolsListeners[value];
      });
    });
    // Добавить удаление класса active или что-нибудь подобного.
  }

  circle() {
    let isMouseDown = false;
    let x;
    let y;
    const startDrawing = (e) => {
      isMouseDown = true;
      [x, y] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      isMouseDown = false;
    };

    const drawCircle = (e) => {
      if (!isMouseDown) return;
      const [x0, y0] = [e.offsetX, e.offsetY];
      const radius = Math.sqrt(((x0 - x) ** 2) + ((y0 - y) ** 2));
      let x1 = 0;
      let y1 = radius;
      let gap = 0;
      let delta = (1 - 2 * radius);
      this.context.clearRect(0, 0, 128, 128);
      // this.context.clearRect(x, y, 64, 64);

      while (y1 >= 0) {
        this.drawPixel(x + x1, y - y1);
        this.drawPixel(x - x1, y - y1);
        this.drawPixel(x - x1, y + y1);
        this.drawPixel(x + x1, y + y1);
        gap = 2 * (delta + y1) - 1;
        if (delta < 0 && gap <= 0) {
          x1 += 1;
          delta += 2 * x1 + 1;
        } else if (delta > 0 && gap > 0) {
          y1 -= 1;
          delta -= 2 * y1 + 1;
        } else {
          x1 += 1;
          delta += 2 * (x1 - y1);
          y1 -= 1;
        }
      }
    };
    this.canvas.addEventListener('mousedown', startDrawing);
    this.canvas.addEventListener('mousemove', drawCircle);
    this.canvas.addEventListener('mouseup', stopDrawing);
    this.canvas.addEventListener('mouseout', stopDrawing);

    this.addFunctionsInState('mousedown', startDrawing);
    this.addFunctionsInState('mousemove', drawCircle);
    this.addFunctionsInState('mouseup', stopDrawing);
    this.addFunctionsInState('mouseout', stopDrawing);
  }

  rectangle() {
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    let isMouseDown = false;
    const primaryColor = document.querySelector('.primary');
    this.context.fillStyle = primaryColor;

    const startDrawing = (e) => {
      isMouseDown = true;
      [x, y] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      isMouseDown = false;
    };

    const drawLine = (e) => {
      if (isMouseDown) {
        this.context.clearRect(x, y, width, height);
        this.context.beginPath();
        this.context.lineWidth = this.pixelWidth;
        console.log(this.pixelWidth);
        width = e.offsetX - x;
        height = e.offsetY - y;
        this.context.fillRect(x, y, width, height);
        // context.rect(x, y, width, height);
        // context.stroke();
      }
    };

    this.canvas.addEventListener('mousedown', startDrawing);
    this.canvas.addEventListener('mousemove', drawLine);
    this.canvas.addEventListener('mouseup', stopDrawing);
    this.canvas.addEventListener('mouseout', stopDrawing);

    this.addFunctionsInState('mousedown', startDrawing);
    this.addFunctionsInState('mousemove', drawLine);
    this.addFunctionsInState('mouseup', stopDrawing);
    this.addFunctionsInState('mouseout', stopDrawing);
  }

  emptyRectangle() {
    let x = 0;
    let y = 0;
    let lastX = 0;
    let lastY = 0;
    let width = 0;
    let height = 0;
    let isMouseDown = false;
    const primaryColor = document.querySelector('.primary');
    this.context.fillStyle = primaryColor;

    const startDrawing = (e) => {
      isMouseDown = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      isMouseDown = false;
    };

    const drawLine = (e) => {
      [x, y] = [e.offsetX, e.offsetY];
      if (isMouseDown) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        width = x - lastX;
        height = y - lastY;
        this.context.rect(lastX, lastY, width, height);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 10;
        this.context.stroke();
      }
    };

    this.canvas.addEventListener('mousedown', startDrawing);
    this.canvas.addEventListener('mousemove', drawLine);
    this.canvas.addEventListener('mouseup', stopDrawing);
    this.canvas.addEventListener('mouseout', stopDrawing);

    this.addFunctionsInState('mousedown', startDrawing);
    this.addFunctionsInState('mousemove', drawLine);
    this.addFunctionsInState('mouseup', stopDrawing);
    this.addFunctionsInState('mouseout', stopDrawing);
  }

  move() {
    let isMouseDown = false;
    let x = 0;
    let y = 0;
    let deltaX = 0;
    let deltaY = 0;
    let imageData = null;

    const startDrawing = (e) => {
      isMouseDown = true;
      [x, y] = [e.offsetX, e.offsetY];
      imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };

    const stopDrawing = () => {
      isMouseDown = false;
    };

    const drawLine = (e) => {
      if (isMouseDown) {
        this.clearField();
        [deltaX, deltaY] = [e.offsetX - x, e.offsetY - y];
        this.context.putImageData(imageData, deltaX, deltaY);
      }
    };

    this.canvas.addEventListener('mousedown', startDrawing);
    this.canvas.addEventListener('mousemove', drawLine);
    this.canvas.addEventListener('mouseup', stopDrawing);
    this.canvas.addEventListener('mouseout', stopDrawing);

    this.addFunctionsInState('mousedown', startDrawing);
    this.addFunctionsInState('mousemove', drawLine);
    this.addFunctionsInState('mouseup', stopDrawing);
    this.addFunctionsInState('mouseout', stopDrawing);
  }

  bright() {
    let x1;
    let y1;
    let startX;
    let startY;
    let coordX1;
    let coordY1;

    const changeBright = (e) => {
      const widthPixel = this.canvas.width / 128;
      x1 = e.offsetX;
      y1 = e.offsetY;
      coordX1 = Math.floor(x1 / widthPixel);
      coordY1 = Math.floor(y1 / widthPixel);
      startX = coordX1 * widthPixel;
      startY = coordY1 * widthPixel;
      const imgData = this.context.getImageData(startX, startY, 1, 1);
      const color = `rgb(${imgData.data[0] * 1.1}, ${imgData.data[1] * 1.1}, ${imgData.data[2] * 1.1})`;
      this.context.fillStyle = color;
      this.context.fillRect(startX, startY, widthPixel, widthPixel);
    };
    this.canvas.addEventListener('click', changeBright);
  }
}
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
