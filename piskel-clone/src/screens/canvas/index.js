import Tools from './tools/toolsbar';
import GetPosition from './tools/postionGetting';
import GetResizeTool from './tools/fieldResize';
// import GetInitialCanvas from './canvasField/initialcanvas';
import CreatePictures from './canvasField/canvas';

export default class App {
  start() {
    const canvas = new CreatePictures();
    canvas.initCanvas();
    canvas.initAddShotButton();
    canvas.startAnimation();
    canvas.setFullscreen();
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new GetPosition();
    coords.getCoordinate();
    const resize = new GetResizeTool();
    resize.getResizeField();
  }
}
