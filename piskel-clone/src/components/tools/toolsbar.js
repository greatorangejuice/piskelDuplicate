/* eslint-disable space-in-parens */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
export default class Tools {
  getActionButtons(e) {
    let target = e.target;
    while (target !== this) {
      if (target.tagName === 'BUTTON') {
        let action = e.target.dataset.action;
        switch (action) {
          case 'pen-tool':
            console.log('pen-tool');
            break;
          case 'bucket-tool':
            console.log('bucket-tool');
            break;
          default:
            return;
        }
        return;
      }
      target = target.parentnode;
    }
  }
}


// const getActionButtons = (e) => {
//   let target = e.target;
//   while (target != this) {
//       if (target.tagName == 'BUTTON') {
//           let action = e.target.dataset.action;
//           switch (action) {
//               case 'paintBucket':
//                   paintBucket();
//                   break;
//               case 'chooseColor':
//                   chooseColor();
//                   break;
//               case 'move':
//                   move();
//                   break;
//               case 'transform':
//                   transform();
//                   break;
//           }
//           return;
//       }
//       target = target.parentNode;
//   }
// };
// firstPallete.addEventListener("click", getActionButtons);
