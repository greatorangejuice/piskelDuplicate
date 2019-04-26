let firstPallete= document.querySelector("#first-pallete");

firstPallete.addEventListener( "click", (e) => {
    let target = e.target;
    

    while (target != firstPallete) {
        
        if (target.tagName == 'BUTTON') {
            console.log(target);
          return;
        }
            target = target.parentNode;
        
      }
} )