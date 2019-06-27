import Tools from './tools/toolsbar';
import PaintFieldParamsGetter from './tools/postionGetting';
import GoogleAuth from '../../authorization/googleAuth';
import PictureCreator from './canvasField/canvas';
import Filters from './tools/filters';
import Tooltips from './tools/tooltips';
import Hotkeys from './tools/hotkeys';

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
    const tooltips = new Tooltips();
    tooltips.init();
    const hotkeys = new Hotkeys();
    hotkeys.init();
  }
}
