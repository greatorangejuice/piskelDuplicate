export default class Pen {
  getPen() {
    const paintCanvas = document.querySelector('.canvas');
    const context = paintCanvas.getContext('2d');
    context.lineCap = 'square';

    const colorPicker = document.querySelector('.js-color-picker');

    colorPicker.addEventListener('change', (event) => {
      context.strokeStyle = event.target.value;
    });

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
        console.log(x, y);
        console.log(newX, newY);
        context.beginPath();
        context.moveTo(x, y);
        // context.lineTo(newX, newY);
        // context.fillRect(newX, newY, 5, 5);
        context.fillStyle = picture.pixel(x, y);
        context.fillRect(x * 10, y * 10, 10, 10);
        context.stroke();
        [x, y] = [newX, newY];
      }
    };

    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', drawLine);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);
  }
  // getPen() {
  //   const canvas = document.querySelector('.canvas');
  //   const ctx = canvas.getContext('2d');
  //   const clickX = [];
  //   const clickY = [];
  //   const clickDrag = [];
  //   let paint;

  //   const addClick = (x, y, dragging) => {
  //     clickX.push(x);
  //     clickY.push(y);
  //     clickDrag.push(dragging);
  //   };


  //   function redraw() {
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

  //     ctx.strokeStyle = '#df4b26';
  //     ctx.lineJoin = 'round';
  //     ctx.lineWidth = 5;

  //     for (let i = 0; i < clickX.length; i += 1) {
  //       ctx.beginPath();
  //       if (clickDrag[i] && i) {
  //         ctx.moveTo(clickX[i - 1], clickY[i - 1]);
  //       } else {
  //         ctx.moveTo(clickX[i] - 1, clickY[i]);
  //       }
  //       ctx.lineTo(clickX[i], clickY[i]);
  //       ctx.closePath();
  //       ctx.stroke();
  //     }
  //   }

  //   function handleDown(e) {
  //     paint = true;
  //     addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  //     redraw();
  //   }

  //   function handleMove(e) {
  //     if (paint) {
  //       addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  //       redraw();
  //       console.log('handleMove');
  //       // console.log(`clickX: ${clickX}`);
  //     }
  //   }

  //   const handleMouseupAndMouseLeave = () => {
  //     paint = false;
  //   };


  //   canvas.addEventListener('mousedown', handleDown);
  //   canvas.addEventListener('mousemove', handleMove);
  //   canvas.addEventListener('mouseup', handleMouseupAndMouseLeave);
  //   canvas.addEventListener('mouseleave', handleMouseupAndMouseLeave);
  // }
}
