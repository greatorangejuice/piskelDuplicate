import tippy from 'tippy.js';

export default class Tooltips {
  init() {
    tippy('.tool', {
      animation: 'shift-away',
      placement: 'right',
    });
  }
}
