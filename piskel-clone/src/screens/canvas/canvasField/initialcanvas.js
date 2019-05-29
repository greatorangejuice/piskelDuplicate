export default class GetInitialCanvas {
  constructor(scale) {
    this.scale = scale;
  }

  getCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.width = 32 * this.scale;
    canvas.height = 32 * this.scale;
  }
}
