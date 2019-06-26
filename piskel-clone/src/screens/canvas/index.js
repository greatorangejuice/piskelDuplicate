import Tools from './tools/toolsbar';
import PaintFieldParamsGetter from './tools/postionGetting';
import GoogleAuth from '../../authorization/googleAuth';
import PictureCreator from './canvasField/canvas';
// import KeyPress from '../../keypressLib/keypress/'

export default class App {
  start() {
    // const keyPress = new KeyPress();
    const canvas = new PictureCreator();
    canvas.framesUpdateListener();
    canvas.initAddShotButton();
    canvas.startAnimation();
    canvas.setFullscreen();
    canvas.changeActiveFrame();
    canvas.changeFieldSize();
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new PaintFieldParamsGetter();
    coords.getCoordinate();
    coords.changeZoom();
    const google = new GoogleAuth();
    google.init();
  }
}
