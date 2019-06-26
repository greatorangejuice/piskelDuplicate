export default class PaintFieldParamsGetter {
  getCoordinate() {
    const canvas = document.querySelector('.paint-field');
    const xCoord = document.querySelector('.x-coord');
    const yCoord = document.querySelector('.y-coord');

    canvas.addEventListener('mousemove', (e) => {
      xCoord.innerText = `X: ${e.offsetX}`;
      yCoord.innerText = `Y: ${e.offsetY}`;
    });

    canvas.addEventListener('mouseleave', () => {
      xCoord.innerText = '';
      yCoord.innerText = '';
    });
  }

  changeZoom() {
    // const canvas = document.querySelector('.paint-field');
    const canvasField = document.querySelector('.canvas-field');
    canvasField.addEventListener('scroll', (e) => {
      e.preventDefault();
      console.log('scrolled!');
    });
  }
}
