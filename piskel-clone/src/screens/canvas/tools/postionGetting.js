export default class GetPosition {
  // getCoordinate() {
  //   const canvas = document.querySelector('.canvas');
  //   const xCoord = document.querySelector('.x-coord');
  //   const yCoord = document.querySelector('.y-coord');
  //   const getPosition = (p, e) => {
  //     const a = p.getBoundingClientRect();
  //     return {
  //       x: e.clientX - a.left,
  //       y: e.clientY - a.top,
  //     };
  //   };
  //   canvas.addEventListener('mousemove', (e) => {
  //     const position = getPosition(canvas, e);
  //     xCoord.innerText = `x :${position.x}`;
  //     yCoord.innerText = `y: ${position.y}`;
  //   });
  // }

  getCoordinate() {
    const canvas = document.querySelector('.canvas');
    const xCoord = document.querySelector('.x-coord');
    const yCoord = document.querySelector('.y-coord');

    canvas.addEventListener('mousemove', (e) => {
      xCoord.innerText = e.offsetX;
      yCoord.innerText = e.offsetY;
    });
  }
}
