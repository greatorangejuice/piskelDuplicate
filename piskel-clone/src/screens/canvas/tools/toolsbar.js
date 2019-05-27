/* eslint-disable prefer-destructuring */
export default class Tools {
  setToolsbar() {
    const canvasTools = document.querySelector('.canvas-tools');
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');


    const getTriangle = () => {
      console.log('triangle-tool');
    };
    const changeSize = () => {
      canvas.style.width = `${32}px`;
      console.log('change size');
      ctx.scale(2, 2);
    };


    const getActionButtons = (e) => {
      let target = e.target;
      while (target !== this) {
        if (target.tagName === 'BUTTON') {
          const action = e.target.dataset.action;
          switch (action) {
            case 'pen-tool':
              console.log('pen-tool');
              break;
            case 'bucket-tool':
              console.log('bucket-tool');
              break;
            case 'triangle-tool':
              getTriangle();
              break;
            case 'canvas-size-tool':
              changeSize();
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
