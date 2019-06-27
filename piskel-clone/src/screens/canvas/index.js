import Tools from './tools/toolsbar';
import PaintFieldParamsGetter from './tools/postionGetting';
import GoogleAuth from '../../authorization/googleAuth';
import PictureCreator from './canvasField/canvas';
import Filters from './tools/filters';

export default class App {
  start() {
    const canvas = new PictureCreator();
    canvas.init();
    const tools = new Tools();
    tools.setToolsbar();
    tools.initKeyBinder();
    const coords = new PaintFieldParamsGetter();
    coords.getCoordinate();
    const google = new GoogleAuth();
    google.init();
    const filter = new Filters();
    filter.initTools();
  }
}
