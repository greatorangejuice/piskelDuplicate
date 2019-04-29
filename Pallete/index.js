
let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');
let secondPallete = document.querySelector("#second-pallete");
let currentColor = document.querySelector('#current-color');
let prevColor = document.querySelector('#previous-color');
let currentColorIdentificator = document.querySelector('.current-circle');
let prevColorIdentificator = document.querySelector('.prev-circle');
let inputColor = document.querySelector('.input-color');
inputColor.value = "#676767";

inputColor.addEventListener("click", function() {
    console.log(this.value);
})



let state = {
    currentColor: "grey",
    previousColor: "green",

}
// Через state постоянный обмен данными не нужен. Только записывать в него, и проверять его состояние
// лишь раз, при запуске функции. 

// Удаление слушателя
const removeEvent = (func) => {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == "27") {
            canvas.removeEventListener('click', func);
            document.body.style.cursor = "";
        }
    })
}

// Активация по кнопкам
document.addEventListener('keyup', (e) => {
    if (e.keyCode == "80") {
        paintBucket();
    }
    if (e.keyCode == "67") {
        chooseColor();
    }
    if (e.keyCode == "77") {
        move();
    }
    if (e.keyCode == "84") {
        transform();
    }
})

// Добавление слушателя на первую панель и активация функций
const getActionButtons = (e) => {
    let target = e.target;
    while (target != this) {
        if (target.tagName == 'BUTTON') {
            let action = e.target.dataset.action;
            switch (action) {
                case 'paintBucket':
                    // remove event
                    paintBucket();
                    break;
                case 'chooseColor':
                    chooseColor();
                    break;
                case 'move':
                    move();
                    break;
                case 'transform':
                    transform();
                    break;
            }
            return;
        }
        target = target.parentNode;
    }
};
firstPallete.addEventListener("click", getActionButtons);

const getColorButtons = (e) => {
    let target = e.target;
    while (target != this) {
        if (target.tagName == 'BUTTON') {
            let color = e.target.dataset.color;
            let buttonValue = e.target.dataset.id

            switch (buttonValue) {
                case 'current':
                    // console.log(`Choosed current color!`, color);
                    // ПРЯМО СЮДА ПОПРОБОВАТЬ ДОБАВИТЬ ПАЛИТРУ
                    break;
                case 'previous':
                    // currentColor.dataset.color = color;
                    inputColor.value = color;
                    // currentColorIdentificator.style.backgroundColor = color;
                    break;
                case 'red':
                    // if (currentColor.dataset.color == color) return;
                    // prevColor.dataset.color = currentColor.dataset.color;
                    // prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
                    // currentColorIdentificator.style.backgroundColor = color;
                    // currentColor.dataset.color = 'red';
                    if (inputColor.value == color) return;
                        prevColor.dataset.color = inputColor.value;
                        prevColorIdentificator.style.backgroundColor = inputColor.value;
                        inputColor.value = "#ff0000";
                    break;
                case 'blue':
                    // if (currentColor.dataset.color == color) return;
                    // prevColor.dataset.color = currentColor.dataset.color;
                    // prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
                    // // currentColorIdentificator.style.backgroundColor = color;
                    // currentColor.dataset.color = 'blue';
                    if (inputColor.value == color) return;
                    prevColor.dataset.color = inputColor.value;
                    prevColorIdentificator.style.backgroundColor = inputColor.value;
                    inputColor.value = "#0000ff";
                    break;
            }
            return;
        }
        target = target.parentNode;
    }
}
secondPallete.addEventListener("click", getColorButtons);

// Добавить на кружок слушатель, чтобы менять цвет!

function paintBucket() {
    document.body.style.cursor = "url('./assets/paint-bucket.png'), auto";
    // const paint = (e) => {
    //     e.target.style.backgroundColor = currentColor.dataset.color;
    // }
    const paint = (e) => {
        e.target.style.backgroundColor = inputColor.value;
    }
    canvas.addEventListener('click', paint);
    removeEvent(paint)
}

function chooseColor() {
    document.body.style.cursor = "url(./assets/choose-color.png), auto";

    function checkColor() {
        let color = window.getComputedStyle(this).backgroundColor;
        let hexColor = "";
            var e = color.replace("rgb(","").replace(")","").split(",");
        let r = +e[0];
            let g = +e[1];
            let b = +e[2];
            hexColor = rgbToHex(r,g,b);
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        // if (currentColor.dataset.color == color) return;
        // prevColor.dataset.color = currentColor.dataset.color;
        // prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
        // currentColor.dataset.color = color;
        // currentColorIdentificator.style.backgroundColor = color;
        if (inputColor.value == hexColor) return;
        prevColor.dataset.color = inputColor.value;
        prevColorIdentificator.style.backgroundColor = inputColor.value;
        inputColor.value = hexColor;
    }

    var blocks = document.querySelectorAll('.square');
    [].forEach.call(blocks, function (e) {
        e.addEventListener('click', checkColor);
    });

    document.addEventListener('keyup', (e) => {
        if (e.keyCode == "27") {
            [].forEach.call(blocks, function (e) {
                e.removeEventListener('click', checkColor);
            });
            document.body.style.cursor = "";
        }
    })
}

function transform() {
    document.body.style.cursor = "url('./assets/trasform.png'), auto";
    const toggleCircle = (e) => {
        e.target.classList.toggle('circle');
    }
    canvas.addEventListener('click', toggleCircle);
    removeEvent(toggleCircle)
}

function move() {

    var tempValue = null;

    function handleDragStart(e) {
        tempValue = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', window.getComputedStyle(this).order);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';  
        return false;
    }

    function handleDragEnter() {
        this.classList.add('over');
    }

    function handleDragLeave() {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (tempValue != this) {
            tempValue.style.order = window.getComputedStyle(this).order;
            e.target.style.order = e.dataTransfer.getData('text/html'); 
        }

        return false;
    }

    function handleDragEnd() {

        [].forEach.call(cols, function (col) {
            col.classList.remove('over');
        });
    }

    var cols = document.querySelectorAll('.square');
    [].forEach.call(cols, function (col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });

}





// var hexDigits = new Array
//         ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

// //Function to convert rgb color to hex format
// function rgb2hex(rgb) {
//  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
// }

// function hex(x) {
//   return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
//  }

// "rgba(0, 0, 0, 0.2)"

// function testRemove (...rest){
//     for (let i = 0; i < rest.length; i++) {


//     document.addEventListener('keyup', (e) => {
//         if (e.keyCode == "27") {

//             canvas.removeEventListener('click', rest[i]);
//             document.removeEventListener('click', rest[i]);
//             document.body.style.cursor = "";
//             console.log(`Test removed`);
//         }
//     })
// }
// }

// testRemove(paintBucket, chooseColor, move, transform);

// function move_old() {
//     console.log(`move function work`);
//     document.body.style.cursor = "url('./assets/move.png'), auto";

//     const drag = (e) => {
//         let target = e.target;
//         console.log(e.target);

//         while (target != this) {
//             if (target.tagName == 'DIV') {
//                 target.style.position = "absolute";

//                 return
//             }
//             target = target.parentNode;
//         }
//     }
//     canvas.addEventListener("mousedown", drag);

//     removeEvent(drag)
// }

// function chooseColor_old() {
//     console.log(`chooseColor function work`);
//     // secondPallete.style.cursor = "url('./assets/choose-color.png'), auto";

//     secondPallete.addEventListener("click", getColor);
//     removeEvent(getColor);
// }