/* eslint-disable no-unused-vars */
let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');
let secondPallete = document.querySelector("#second-pallete");
let currentColor = document.querySelector('#current-color');
let prevColor = document.querySelector('#previous-color');
let currentColorIdentificator = document.querySelector('.current-circle');
let prevColorIdentificator = document.querySelector('.prev-circle');

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
                    currentColor.dataset.color = color;
                    currentColorIdentificator.style.backgroundColor = color;
                    break;
                case 'red':
                    if (currentColor.dataset.color == color) return;
                    prevColor.dataset.color = currentColor.dataset.color;
                    prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
                    currentColorIdentificator.style.backgroundColor = color;
                    currentColor.dataset.color = 'red';
                    break;
                case 'blue':
                    if (currentColor.dataset.color == color) return;
                    prevColor.dataset.color = currentColor.dataset.color;
                    prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
                    currentColorIdentificator.style.backgroundColor = color;
                    currentColor.dataset.color = 'blue';
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
    const paint = (e) => {
        e.target.style.backgroundColor = currentColor.dataset.color;
    }
    canvas.addEventListener('click', paint);
    removeEvent(paint)
}

function chooseColor() {
    document.body.style.cursor = "url(./assets/choose-color.png), auto";

    function checkColor() {
        let color = window.getComputedStyle(this).backgroundColor;

        if (currentColor.dataset.color == color) return;
        prevColor.dataset.color = currentColor.dataset.color;
        prevColorIdentificator.style.backgroundColor = currentColor.dataset.color;
        currentColor.dataset.color = color;
        currentColorIdentificator.style.backgroundColor = color;
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

        // eslint-disable-next-line no-console
        console.log(window.getComputedStyle(this).order);
        // tempValue = window.getComputedStyle(this).order;
        // e.dataTransfer.setData("text", window.getComputedStyle(this).order);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
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
            //  e.target.style.order = 5;
            // console.log(e.target.style.order);
            tempValue.order = window.getComputedStyle(this).order
            e.target.style.order = e.dataTransfer.getData('text/html');

            // window.getComputedStyle(this).order = 5;

            // e.target.style.order = e.dataTransfer.getData('text/html');
        }

        //OLD VERS
        // var data = e.dataTransfer.getData("Text");
        // console.log(data);
        // e.target.style.order = data;
        // console.log("NEW " + e.target.style.order);
        // OLD VERS

        return false;
    }

    function handleDragEnd() {
        // this/e.target is the source node.

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






// function testRemove (){
//     for (let i = 0; i < arguments.length; i++) {


//     document.addEventListener('keyup', (e) => {
//         if (e.keyCode == "27") {

//             canvas.removeEventListener('click', arguments[i]);
//             document.removeEventListener('click', arguments[i]);
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