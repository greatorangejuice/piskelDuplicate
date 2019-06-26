import Tools from './tools/toolsbar';
import PaintFieldParamsGetter from './tools/postionGetting';
import GoogleAuth from '../../authorization/googleAuth';
import PictureCreator from './canvasField/canvas';

export default class App {
  start() {
    const canvas = new PictureCreator();
    canvas.init();
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new PaintFieldParamsGetter();
    coords.getCoordinate();
    const google = new GoogleAuth();
    google.init();
  }
}
