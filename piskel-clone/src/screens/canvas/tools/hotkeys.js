import hotkeys from 'hotkeys-js';

export default class Hotkeys {
  init() {
    hotkeys('shift+p', (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('you pressed p!');
    });
  }
}
