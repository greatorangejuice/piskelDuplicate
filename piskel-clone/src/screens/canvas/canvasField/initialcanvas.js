export default class GetInitialCanvas {
  constructor(scale) {
    this.scale = scale;
  }

  getCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.width = 512;
    canvas.height = 512;
  }
}
