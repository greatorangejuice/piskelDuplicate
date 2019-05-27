import Tools from '../../components/tools/toolsbar';

export default class App {
  start() {
    const tools = new Tools();
    // tools.checkToolsBar();
    const canvasTools = document.querySelector('.canvas-tools');
    canvasTools.addEventListener('click', tools.getActionButtons);
  }
}
