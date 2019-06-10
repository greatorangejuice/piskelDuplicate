import Tools from './tools/toolsbar';
import GetPaintFieldParams from './tools/postionGetting';
// import GetResizeTool from './tools/fieldResize';
import CreatePictures from './canvasField/canvas';

export default class App {
  start() {
    const canvas = new CreatePictures();
    canvas.framesUpdateListener();
    canvas.initAddShotButton();
    canvas.startAnimation();
    canvas.setFullscreen();
    // canvas.addShot();
    canvas.changeFieldSize();
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new GetPaintFieldParams();
    coords.getCoordinate();
    coords.changeZoom();
  }
}
