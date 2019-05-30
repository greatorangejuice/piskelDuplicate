export default class GetPosition {
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
