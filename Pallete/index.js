let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');
let secondPallete = document.querySelector("#second-pallete");
let currentColor = document.querySelector('#current-color');
let prevColor = document.querySelector('#previous-color');
let currentColorIdentificator = document.querySelector('.current-circle');
let prevColorIdentificator = document.querySelector('.prev-circle');
let inputColor = document.querySelector('.input-color');
inputColor.value = "#676767";

let state = {
    currentColor: "#676767",
    previousColor: "#007100",
    order: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    color: ["#7d7d7d", "#7d7d7d", "#7d7d7d", "#7d7d7d", "#7d7d7d", "#7d7d7d", "#7d7d7d", "#7d7d7d", "#7d7d7d"],
    form: [],
};

//Запускаю функцию, которая обновляет Стейт, а после применяю все значения стейта по адресам.

console.log(state);
let stateInJSON = JSON.stringify(state)
console.log(stateInJSON);
// localStorage.setItem(JSON.stringify(state));
console.log(JSON.parse(stateInJSON));
// console.log(localStorage);
// Через state постоянный обмен данными не нужен. Только записывать в него, и проверять его состояние
// лишь раз, при запуске функции. 

let keyBoadrKeysCodes = {
    ESC: "27",
    P: "80",
    C: "67",
    M: "77",
    T: "84",
};

const addEventRemover = (func) => {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == keyBoadrKeysCodes.ESC) {
            canvas.removeEventListener('click', func);
            document.body.style.cursor = "";
        }
    })
};

const addActiveButtons = () => {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == keyBoadrKeysCodes.P) {
            paintBucket();
        }
        if (e.keyCode == keyBoadrKeysCodes.C) {
            chooseColor();
        }
        if (e.keyCode == keyBoadrKeysCodes.M) {
            move();
        }
        if (e.keyCode == keyBoadrKeysCodes.T) {
            transform();
        }
    });
}
addActiveButtons();

const getActionButtons = (e) => {
    let target = e.target;
    while (target != this) {
        if (target.tagName == 'BUTTON') {
            let action = e.target.dataset.action;
            switch (action) {
                case 'paintBucket':
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
                    break;
                case 'previous':
                    inputColor.value = color;
                    state.currentColor = color;
                    break;
                case 'red':
                    if (inputColor.value == color) return;
                    prevColor.dataset.color = inputColor.value;
                    prevColorIdentificator.style.backgroundColor = inputColor.value;
                    inputColor.value = "#ff0000";
                    state.currentColor = "#ff0000";
                    break;
                case 'blue':
                    if (inputColor.value == color) return;
                    prevColor.dataset.color = inputColor.value;
                    prevColorIdentificator.style.backgroundColor = inputColor.value;
                    inputColor.value = "#0000ff";
                    state.currentColor = "#0000ff";
                    break;
            }
            return;
        }
        target = target.parentNode;
    }
}
secondPallete.addEventListener("click", getColorButtons);

function paintBucket() {
    removeChooseColor();
    document.body.style.cursor = "url('./assets/paint-bucket.png'), auto";
    const paint = (e) => {
        e.target.style.backgroundColor = inputColor.value;
    }
    canvas.addEventListener('click', paint);
    addEventRemover(paint)
}

function chooseColor() {
    document.body.style.cursor = "url(./assets/choose-color.png), auto";
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

function checkColor() {
    let color = window.getComputedStyle(this).backgroundColor;
    let hexColor = "";
    var e = color.replace("rgb(", "").replace(")", "").split(",");
    let r = +e[0];
    let g = +e[1];
    let b = +e[2];
    hexColor = rgbToHex(r, g, b);

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };
    if (inputColor.value == hexColor) return;
    state.previousColor = inputColor.value;
    prevColor.dataset.color = inputColor.value;
    prevColorIdentificator.style.backgroundColor = inputColor.value;
    inputColor.value = hexColor;
    state.currentColor = hexColor;
}

function removeChooseColor() {
    var blocks = document.querySelectorAll('.square');
    [].forEach.call(blocks, function (e) {
        e.removeEventListener('click', checkColor);
    });
    document.body.style.cursor = "";
}

function transform() {
    document.body.style.cursor = "url('./assets/trasform.png'), auto";
    const toggleCircle = (e) => {
        e.target.classList.toggle('circle');
    }
    canvas.addEventListener('click', toggleCircle);
    addEventRemover(toggleCircle)
}

function move() {
    document.body.style.cursor = "url('./assets/move.png'), auto";
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

    document.addEventListener('keyup', (e) => {
        if (e.keyCode == "27") {
            [].forEach.call(cols, function (col) {
                col.removeEventListener('dragstart', handleDragStart, false);
                col.removeEventListener('dragenter', handleDragEnter, false);
                col.removeEventListener('dragover', handleDragOver, false);
                col.removeEventListener('dragleave', handleDragLeave, false);
                col.removeEventListener('drop', handleDrop, false);
                col.removeEventListener('dragend', handleDragEnd, false);
            });
            document.body.style.cursor = "";
        }
    })

}




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



// const getColorButtons = (e) => {
//     let target = e.target;
//     while (target != this) {
//         if (target.tagName == 'BUTTON') {
//             let color = e.target.dataset.color;
//             let buttonValue = e.target.dataset.id

//             switch (buttonValue) {
//                 case 'current':
//                     // console.log(`Choosed current color!`, color);
//                     // ПРЯМО СЮДА ПОПРОБОВАТЬ ДОБАВИТЬ ПАЛИТРУ
//                     break;
//                 case 'previous':
//                     // currentColor.dataset.color = color;
//                     inputColor.value = color;
//                     // currentColorIdentificator.style.backgroundColor = color;
//                     break;
//                 case 'red':
//                     // if (currentColor.dataset.color == color) return;
//                     // prevColor.dataset.color = currentColor.dataset.color;
//                     // prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
//                     // currentColorIdentificator.style.backgroundColor = color;
//                     // currentColor.dataset.color = 'red';
//                     if (inputColor.value == color) return;
//                     prevColor.dataset.color = inputColor.value;
//                     prevColorIdentificator.style.backgroundColor = inputColor.value;
//                     inputColor.value = "#ff0000";
//                     break;
//                 case 'blue':
//                     // if (currentColor.dataset.color == color) return;
//                     // prevColor.dataset.color = currentColor.dataset.color;
//                     // prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
//                     // // currentColorIdentificator.style.backgroundColor = color;
//                     // currentColor.dataset.color = 'blue';
//                     if (inputColor.value == color) return;
//                     prevColor.dataset.color = inputColor.value;
//                     prevColorIdentificator.style.backgroundColor = inputColor.value;
//                     inputColor.value = "#0000ff";
//                     break;
//             }
//             return;
//         }
//         target = target.parentNode;
//     }
// }
// secondPallete.addEventListener("click", getColorButtons);

// // Добавить на кружок слушатель, чтобы менять цвет!

// function paintBucket() {
//     document.body.style.cursor = "url('./assets/paint-bucket.png'), auto";
//     // const paint = (e) => {
//     //     e.target.style.backgroundColor = currentColor.dataset.color;
//     // }
//     const paint = (e) => {
//         e.target.style.backgroundColor = inputColor.value;
//     }
//     canvas.addEventListener('click', paint);
//     addEventRemover(paint)
// }

// function chooseColor() {
//     document.body.style.cursor = "url(./assets/choose-color.png), auto";

//     function checkColor() {
//         let color = window.getComputedStyle(this).backgroundColor;
//         let hexColor = "";
//         var e = color.replace("rgb(", "").replace(")", "").split(",");
//         let r = +e[0];
//         let g = +e[1];
//         let b = +e[2];
//         hexColor = rgbToHex(r, g, b);

//         function componentToHex(c) {
//             var hex = c.toString(16);
//             return hex.length == 1 ? "0" + hex : hex;
//         }

//         function rgbToHex(r, g, b) {
//             return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//         }
//         // if (currentColor.dataset.color == color) return;
//         // prevColor.dataset.color = currentColor.dataset.color;
//         // prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
//         // currentColor.dataset.color = color;
//         // currentColorIdentificator.style.backgroundColor = color;
//         if (inputColor.value == hexColor) return;
//         prevColor.dataset.color = inputColor.value;
//         prevColorIdentificator.style.backgroundColor = inputColor.value;
//         inputColor.value = hexColor;
//     }

//     var blocks = document.querySelectorAll('.square');
//     [].forEach.call(blocks, function (e) {
//         e.addEventListener('click', checkColor);
//     });

//     document.addEventListener('keyup', (e) => {
//         if (e.keyCode == "27") {
//             [].forEach.call(blocks, function (e) {
//                 e.removeEventListener('click', checkColor);
//             });
//             document.body.style.cursor = "";
//         }
//     })
// }

// function transform() {
//     document.body.style.cursor = "url('./assets/trasform.png'), auto";
//     const toggleCircle = (e) => {
//         e.target.classList.toggle('circle');
//     }
//     canvas.addEventListener('click', toggleCircle);
//     addEventRemover(toggleCircle)
// }

// function move() {
//     document.body.style.cursor = "url('./assets/move.png'), auto";
//     var tempValue = null;

//     function handleDragStart(e) {
//         tempValue = this;
//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData('text/html', window.getComputedStyle(this).order);
//     }

//     function handleDragOver(e) {
//         if (e.preventDefault) {
//             e.preventDefault();
//         }
//         e.dataTransfer.dropEffect = 'move';
//         return false;
//     }

//     function handleDragEnter() {
//         this.classList.add('over');
//     }

//     function handleDragLeave() {
//         this.classList.remove('over');
//     }

//     function handleDrop(e) {
//         if (e.stopPropagation) {
//             e.stopPropagation();
//         }
//         if (tempValue != this) {
//             tempValue.style.order = window.getComputedStyle(this).order;
//             e.target.style.order = e.dataTransfer.getData('text/html');
//         }

//         return false;
//     }

//     function handleDragEnd() {

//         [].forEach.call(cols, function (col) {
//             col.classList.remove('over');
//         });
//     }

//     var cols = document.querySelectorAll('.square');
//     [].forEach.call(cols, function (col) {
//         col.addEventListener('dragstart', handleDragStart, false);
//         col.addEventListener('dragenter', handleDragEnter, false);
//         col.addEventListener('dragover', handleDragOver, false);
//         col.addEventListener('dragleave', handleDragLeave, false);
//         col.addEventListener('drop', handleDrop, false);
//         col.addEventListener('dragend', handleDragEnd, false);
//     });

// }
