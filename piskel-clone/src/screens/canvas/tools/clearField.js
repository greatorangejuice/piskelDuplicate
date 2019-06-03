export default class Clear {
  clearField() {
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 512, 512);
  }
}
