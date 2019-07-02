import hotkeys from 'hotkeys-js';
import Tools from './toolsbar';

export default class Hotkeys {
  init() {
    hotkeys('p', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.clearCurrentState();
      tools.pen();
    });
    hotkeys('shift+p', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.mirrorPen();
    });
    hotkeys('c', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.circle();
    });
    hotkeys('ctrl+b', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.bucket();
    });
    hotkeys('r', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.clearCurrentState();
      tools.rectangle();
    });
    hotkeys('shift+r', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.emptyRectangle();
    });
    hotkeys('shift+c', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.clearField();
    });
    hotkeys('e', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.pen(1);
    });
    hotkeys('z', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.zoom();
    });
    hotkeys('m', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.move();
    });
    hotkeys('ctrl+p', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.pipette();
    });
    hotkeys('b', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.bright();
    });
    hotkeys('shift+b', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.bright(0);
    });
    hotkeys('s', (event) => {
      event.preventDefault();
      const tools = new Tools();
      tools.shape();
    });
  }
}
