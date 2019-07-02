import tippy from 'tippy.js';

export default class Tooltips {
  init() {
    tippy('.pen-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Pen (<span style="color: aqua;">P</span>) <br> Mirror pen (<span style="color: aqua;">Shift+P</span>)',
    });

    tippy('.line-size-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Change pixel size',
    });

    tippy('.mirror-pen-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Mirror pen (<span style="color: aqua;">Shift+P</span>)',
    });

    tippy('.circle', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Circle (<span style="color: aqua;">C</span>)',
    });

    tippy('.bucket-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Paint Bucket (<span style="color: aqua;">B</span>)',
    });

    tippy('.rectangle-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Rectangle (<span style="color: aqua;">R</span>)',
    });

    tippy('.second-rectangle-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Empty Rectangle (<span style="color: aqua;">Shift+R</span>)',
    });

    tippy('.trash-tool', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Clear Field (<span style="color: aqua;">Shift+C</span>)',
    });

    tippy('.eraser', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Eraser (<span style="color: aqua;">E</span>)',
    });

    tippy('.zoom', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Zoom (<span style="color: aqua;">Z</span>)',
    });

    tippy('.move', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Move (<span style="color: aqua;">M</span>)',
    });

    tippy('.pipette', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Color Picker (<span style="color: aqua;">Ctrl+P</span>)',
    });

    tippy('.bright', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Bright | Darker (<span style="color: aqua;">B | Shift+B</span>)',
    });

    tippy('.shape', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Shape (<span style="color: aqua;">S</span>)',
    });

    tippy('.dithering', {
      animation: 'shift-away',
      placement: 'right',
      content: 'Dithering (<span style="color: aqua;">D</span>)',
    });

    tippy('.sepia', {
      animation: 'shift-away',
      placement: 'left',
      content: 'Apply <span style="color: aqua;">SEPIA</span> filter',
    });

    tippy('.add-frame-tool', {
      animation: 'shift-away',
      placement: 'bottom',
      content: 'Add new frame (<span style="color: aqua;">F</span>)',
    });
    tippy('.delete-frame', {
      animation: 'shift-away',
      placement: 'bottom',
      content: '<span style="color: aqua;">Delete</span> frame',
    });
    tippy('.copy-frame', {
      animation: 'shift-away',
      placement: 'bottom',
      content: '<span style="color: aqua;">Copy</span> frame',
    });
    tippy('.gif', {
      animation: 'shift-away',
      placement: 'bottom',
      content: 'Please, press <span style="color: aqua;">GIF</span> everytime after frames update',
    });
    tippy('.canvas-size-tool', {
      animation: 'shift-away',
      placement: 'bottom',
      content: '32x32 | 64x64 | 128x128 is <span style="color: aqua;">available</span>',
    });
    tippy('.fullscreen-tool', {
      animation: 'shift-away',
      placement: 'bottom',
      content: 'Fullscreen mode is<span style="color: aqua;">available</span>',
    });
  }
}
