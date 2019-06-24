import Tools from './tools/toolsbar';
import GetPaintFieldParams from './tools/postionGetting';
import CreatePictures from './canvasField/canvas';
import GoogleAuth from '../../authorization/googleAuth';
// import SwapFrames from './tools/swapframes';


export default class App {
  start() {
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
  }
}
