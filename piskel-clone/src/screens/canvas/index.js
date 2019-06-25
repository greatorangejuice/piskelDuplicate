import Tools from './tools/toolsbar';
import GetPaintFieldParams from './tools/postionGetting';
import CreatePictures from './canvasField/canvas';
import GoogleAuth from '../../authorization/googleAuth';
// import KeyPress from '../../keypressLib/keypress/'

export default class App {
  start() {
    // const keyPress = new KeyPress();
    const canvas = new CreatePictures();
    canvas.framesUpdateListener();
    canvas.initAddShotButton();
    canvas.startAnimation();
    canvas.setFullscreen();
    canvas.changeActiveFrame();
    canvas.changeFieldSize();
    const tools = new Tools();
    tools.setToolsbar();
    const coords = new GetPaintFieldParams();
    coords.getCoordinate();
    coords.changeZoom();
    // const swap = new SwapFrames();
    // swap.goSwap();
    const google = new GoogleAuth();
    google.init();
    // google.getCurrentUser();
    // canvas.testAnim();
  }
}
