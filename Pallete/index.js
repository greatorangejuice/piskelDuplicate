let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');
let secondPallete = document.querySelector("#second-pallete");
let currentColor = document.querySelector('#current-color');
let prevColor = document.querySelector('#previous-color');

let currentColorIdentificator = document.querySelector('.current-circle');
let prevColorIdentificator = document.querySelector('.prev-circle');
// Удаление слушателя
const removeEvent = (func) => {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == "27") {
            canvas.removeEventListener('click', func);
            document.body.style.cursor = "";
            console.log(`Removed`);
        }
    })
}

firstPallete.addEventListener("click", (e) => {
    let target = e.target;
    console.log(e.target);
    while (target != this) {
        if (target.tagName == 'BUTTON') {
            // console.log(e.target.dataset.action)
            let action = e.target.dataset.action;
            switch (action) {
                case 'paintBucket':
                    paintBucket();
                    break;
                case 'chooseColor':
                    chooseColor();
                    break;
                case 'move':
                    moveDND();
                    break;
                case 'transform':
                    transform();
                    break;
            }
            return;
        }
        target = target.parentNode;
    }
});

// Добавить на каждый метод по слушателю!
// Добавить на кружок слушатель, чтобы менять цвет!

function paintBucket() {
    console.log('paintBucket function work');
    document.body.style.cursor = "url('./assets/paint-bucket.png'), auto";
    const paint = (e) => {
        e.target.style.backgroundColor = currentColor.dataset.color;
    }
    canvas.addEventListener('click', paint);
    removeEvent(paint)
}

// Как вариант - вынести слушатели второй палетки отдельно. А Чузер  будет пипеткой цветов.

function chooseColor() {
    console.log(`chooseColor function work`);
    // secondPallete.style.cursor = "url('./assets/choose-color.png'), auto";
    const getColor = (e) => {
        let target = e.target;
        console.log(e.target);
        while (target != this) {
            if (target.tagName == 'BUTTON') {
                let color = e.target.dataset.color;
                let buttonValue = e.target.dataset.id
                switch (buttonValue) {
                    case 'current':
                        console.log(`Choosed current color!`, color);
                        // ПРЯМО СЮДА ПОПРОБОВАТЬ ДОБАВИТЬ ПАЛИТРУ
                        break;
                    case 'previous':
                        currentColor.dataset.color = color;
                        currentColorIdentificator.style.backgroundColor = color;
                        console.log(`Choosed`, color);
                        break;
                    case 'red':
                        if (prevColor.dataset.color != currentColor.dataset.color) {
                            prevColor.dataset.color = currentColor.dataset.color;
                            prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
                        }
                        currentColorIdentificator.style.backgroundColor = color;
                        currentColor.dataset.color = 'red'
                        console.log(`Choosed`, color);
                        break;
                    case 'blue':
                        if (prevColor.dataset.color != currentColor.dataset.color) {
                            prevColor.dataset.color = currentColor.dataset.color;
                            prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
                        }
                        currentColorIdentificator.style.backgroundColor = color;
                        currentColor.dataset.color = 'blue'
                        console.log(`Choosed`, color);
                        break;
                }
                return;
            }
            target = target.parentNode;
        }
    }
    secondPallete.addEventListener("click", getColor);
    removeEvent(getColor);
}

function move() {
    console.log(`move function work`);
    document.body.style.cursor = "url('./assets/move.png'), auto";

    const drag = (e) => {
        let target = e.target;
        console.log(e.target);

        while (target != this) {
            if (target.tagName == 'DIV') {
                target.style.position = "absolute";
               
                return
            }
            target = target.parentNode;
        }
    }
    canvas.addEventListener("mousedown", drag);

    removeEvent(drag)
}


function transform() {
    console.log(`transform function work`);
    document.body.style.cursor = "url('./assets/trasform.png'), auto";
    const toggleCircle = (e) => {
        e.target.classList.toggle('circle');
    }
    canvas.addEventListener('click', toggleCircle);
    removeEvent(toggleCircle)
}




function moveDND() {
    console.log("MOVE");
    
    function handleDragStart(e) {
        this.style.opacity = '0.4';  // this / e.target is the source node.
      }

      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }
      
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        console.log(e.dataTransfer);
        return false;
      }
      
      function handleDragEnter(e) {
        // this / e.target is the current hover target.
        this.classList.add('over');
      }
      
      function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
      }

      function handleDrop(e) {
        // this / e.target is current target element.
      
        if (e.stopPropagation) {
          e.stopPropagation(); // stops the browser from redirecting.
        }
      
        // See the section on the DataTransfer object.
      
        return false;
      }
      
      function handleDragEnd(e) {
        // this/e.target is the source node.
      
        [].forEach.call(cols, function (col) {
          col.classList.remove('over');
        });
      }
      
      var cols = document.querySelectorAll('.square');
      [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
      });

}