import Tools from './tools/toolsbar';
import GetPosition from './tools/postionGetting';
import GetResizeTool from './tools/fieldResize';
import GetInitialCanvas from './canvasField/initialcanvas';

export default class App {
  start() {
    const canvas = new GetInitialCanvas(10);
    canvas.getCanvas();
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new GetPosition();
    coords.getCoordinate();
    const resize = new GetResizeTool();
    resize.getResizeField();
  }
}
