import Tools from './tools/toolsbar';
import GetPosition from './tools/postionGetting';
import GetResizeTool from './tools/fieldResize';

export default class App {
  start() {
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new GetPosition();
    coords.getCoordinate();
    const resize = new GetResizeTool();
    resize.getResizeField();
  }
}
