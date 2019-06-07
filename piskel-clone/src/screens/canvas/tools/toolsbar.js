/* eslint-disable no-unused-vars */
import GetInitialCanvas from '../canvasField/initialcanvas';
// import PixelArtDrawer from './pixelLine';
/* eslint-disable prefer-destructuring */
export default class Tools {
  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    // const ctx = canvas.getContext('2d');
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
          context.beginPath();
          context.moveTo(x, y); // * 10 = 3d tube
          context.lineTo(newX, newY);
          context.fillRect(newX, newY, 10, 10);

          // console.log(`newX: ${newX}, ceilX: ${Math.ceil(newX / 10) * 10}`);
          // context.fillRect(Math.ceil(newX / 10) * 10, Math.ceil(newY / 10) * 10, 10, 10);

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

    // const getPixelPen = () => {
    //   console.log(1);
    // };

    // const goPen = () => {
    //   // const ctx = renderer.getContext('2d');
    //   const pixelArt = new PixelArtDrawer(ctx);
    //   const points = [{
    //     x: 0,
    //     y: 0,
    //   }, {
    //     x: 0,
    //     y: 0,
    //   }];

    //   renderer.onmousemove = function (e) {
    //     const rect = this.getBoundingClientRect();
    //     const lastPoint = points[points.length - 1];
    //     lastPoint.x = e.clientX - rect.left;
    //     lastPoint.y = e.clientY - rect.top;
    //   };
    //   renderer.onclick = () => {
    //     const lastPoint = points[points.length - 1];
    //     points.push({
    //       x: lastPoint.x,
    //       y: lastPoint.y,
    //     });
    //   };

    //   function drawLine(pt) {
    //     pixelArt.lineTo(pt.x, pt.y);
    //   }

    //   function draw() {
    //     ctx.clearRect(0, 0, renderer.width, renderer.height);
    //     pixelArt.beginPath();
    //     points.forEach(drawLine);
    //     pixelArt.stroke();
    //     requestAnimationFrame(draw);
    //   }
    //   draw();
    // };

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

// class PixelArtDrawer {
//   constructor(ctx, options = {}) {
//     if (!(ctx instanceof CanvasRenderingContext2D)) {
//       throw new TypeError('Invalid Argument 1, not a canvas 2d context');
//     }
//     this.cursor = {
//       x: 0,
//       y: 0,
//     };
//     this.strokeStyle = '#000';
//     this.renderer = ctx;
//     this.ctx = document.createElement('canvas').getContext('2d');
//     this.setPixelSize((options && options.pixelSize) || 10);
//   }

//   setPixelSize(pixelSize) {
//     this.pixelSize = pixelSize;
//     const ctx = this.ctx;
//     const canvas = ctx.canvas;
//     const renderer = this.renderer.canvas;

//     canvas.width = (renderer.width / pixelSize) || 0;
//     canvas.height = (renderer.height / pixelSize) || 0;
//     ctx.globalCompositeOperation = 'source-in';
//     this.image = ctx.createImageData(canvas.width, canvas.height);
//     this.data = new Uint32Array(this.image.data.buffer);
//   }

//   beginPath() {
//     this.data.fill(0);
//     this.cursor.x = this.cursor.y = null;
//   }

//   stroke() {
//     const renderer = this.renderer;
//     const currentSmoothing = renderer.imageSmoothingEnbaled;
//     const ctx = this.ctx;
//     ctx.putImageData(this.image, 0, 0);
//     // put the color
//     ctx.fillStyle = this.strokeStyle;
//     ctx.fillRect(0, 0, this.image.width, this.image.height);
//     renderer.imageSmoothingEnabled = false;
//     renderer.drawImage(ctx.canvas, 0, 0, renderer.canvas.width, renderer.canvas.height);
//     renderer.imageSmoothingEnabled = currentSmoothing;
//   }

//   moveTo(x, y) {
//     this.cursor.x = (x / this.pixelSize) || 0;
//     this.cursor.y = (y / this.pixelSize) || 0;
//   }

//   lineTo(x, y) {
//     if (this.cursor.x === null) {
//       this.moveTo(x, y);
//       return;
//     }
//     const data = this.data;
//     const width = this.image.width;
//     const height = this.image.height;
//     let x1 = this.cursor.x;
//     let y1 = this.cursor.y;

//     const x2 = (x / this.pixelSize) || 0;
//     const y2 = (y / this.pixelSize) || 0;
//     // from here it is OP's code
//     const dx = Math.abs(x2 - x1);
//     const sx = x1 < x2 ? 1 : -1;
//     const dy = -Math.abs(y2 - y1);
//     const sy = y1 < y2 ? 1 : -1;
//     let e2;
//     let er = dx + dy;
//     let end = false;
//     let index;
//     while (!end) {
//       // this check would probably be better done out of the loop
//       if (x1 >= 0 && x1 <= width && y1 >= 0 && y1 <= height) {
//         // here we need to convert x, y coords to array index
//         index = ((y1 * width) + x1) || 0;
//         data[index] = 0xff000000;
//       }
//       if (x1 === x2 && y1 === y2) {
//         end = true;
//       } else {
//         e2 = 2 * er;
//         if (e2 > dy) {
//           er += dy;
//           x1 += sx;
//         }
//         if (e2 < dx) {
//           er += dx;
//           y1 += sy;
//         }
//       }
//     }
//     this.cursor.x = x2;
//     this.cursor.y = y2;
//   }
// }

// const goPen = () => {
//   // const ctx = renderer.getContext('2d');
//   const pixelArt = new PixelArtDrawer(ctx);
//   const points = [{
//     x: 0,
//     y: 0,
//   }, {
//     x: 0,
//     y: 0,
//   }];

//   renderer.onmousemove = function (e) {
//     const rect = this.getBoundingClientRect();
//     const lastPoint = points[points.length - 1];
//     lastPoint.x = e.clientX - rect.left;
//     lastPoint.y = e.clientY - rect.top;
//   };
//   renderer.onclick = () => {
//     const lastPoint = points[points.length - 1];
//     points.push({
//       x: lastPoint.x,
//       y: lastPoint.y,
//     });
//   };

//   function drawLine(pt) {
//     pixelArt.lineTo(pt.x, pt.y);
//   }

//   function draw() {
//     ctx.clearRect(0, 0, renderer.width, renderer.height);
//     pixelArt.beginPath();
//     points.forEach(drawLine);
//     pixelArt.stroke();
//     requestAnimationFrame(draw);
//   }
//   draw();
// }
