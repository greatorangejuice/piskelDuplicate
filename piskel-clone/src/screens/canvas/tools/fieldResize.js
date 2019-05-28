export default class GetResizeTool {
  getResizeField() {
    const resizeButton = document.querySelector('.canvas-size-tool');
    const sizeField = document.querySelector('.canvas-size');
    resizeButton.addEventListener('click', () => {
      sizeField.classList.toggle('hide');
    });
  }

  getResizeButtons() {
    // const sizeField = document.querySelector('.canvas-size');
  }
}
