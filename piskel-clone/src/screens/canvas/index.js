// import Tools from '../../components/tools/toolsbar';
import Tools from './tools/toolsbar';

export default class App {
  start() {
    const tools = new Tools();
    tools.setToolsbar();
  }
}
