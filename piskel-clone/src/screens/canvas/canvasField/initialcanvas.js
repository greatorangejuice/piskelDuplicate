export default class GetInitialCanvas {
  constructor(scale) {
    this.scale = scale;
  }

  getCanvas() {
    const canvas = document.querySelector('canvas');
    canvas.width = 128;
    canvas.height = 128;
  }
}
