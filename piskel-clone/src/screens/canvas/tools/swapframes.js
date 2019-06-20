export default class SwapFrames {
  goSwap() {
    const nextShot = document.querySelector('.shots');

    const swap = () => {
      console.log(this);
      const handleDragStart = () => {
        this.style.opacity = '0.4';
        console.log(this);
      };
      const frames = Array.from(document.querySelectorAll('.frame'));
      frames.forEach((frame) => {
        frame.addEventListener('dragstart', handleDragStart.bind(nextShot));
      });
    };


    const test = () => {
      // const nextShot = document.querySelector('.frame');
      const swapper = document.querySelector('.swapper');
      swapper.addEventListener('click', swap.bind(nextShot));
      console.log('binded');
    };
    test.call(nextShot);
  }
}
