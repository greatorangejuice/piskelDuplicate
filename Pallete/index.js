let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');
let secondPallete = document.querySelector("#second-pallete");
let prevColor = document.querySelector('#previous-color');
let prevColorIdentificator = document.querySelector('.prev-circle');
let inputColor = document.querySelector('.input-color');
inputColor.value = "#676767";

var state = {
    currentColor: "#676767",
    previousColor: "#ff0080",
    order: {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    },
    color: {
        one: "#7d7d7d",
        two: "#7d7d7d",
        three: "#7d7d7d",
        four: "#7d7d7d",
        five: "#7d7d7d",
        six: "#7d7d7d",
        seven: "#7d7d7d",
        eight: "#7d7d7d",
        nine: "#7d7d7d",
    },
    form: {
        one: "square",
        two: "square",
        three: "square",
        four: "square",
        five: "square",
        six: "square",
        seven: "square circle",
        eight: "square",
        nine: "square",
    }
};
updateAppAfterReload();

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
                    updateStateInLocalStorage();
                    break;
                case 'red':
                    if (inputColor.value == color) return;
                    prevColor.dataset.color = inputColor.value;
                    state.previousColor = inputColor.value; 
                    prevColorIdentificator.style.backgroundColor = inputColor.value;
                    inputColor.value = "#ff0000";
                    state.currentColor = "#ff0000"; 
                    updateStateInLocalStorage(); 
                    break;
                case 'blue':
                    if (inputColor.value == color) return;
                    prevColor.dataset.color = inputColor.value;
                    state.previousColor = inputColor.value;
                    prevColorIdentificator.style.backgroundColor = inputColor.value;
                    inputColor.value = "#0000ff";
                    state.currentColor = "#0000ff";
                    updateStateInLocalStorage();
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
    removeTransform()
    document.body.style.cursor = "url('./assets/paint-bucket.png'), auto";
    const paint = (e) => {
        e.target.style.backgroundColor = inputColor.value;
        let id = e.target.id;
        state.color[id] = inputColor.value;
        updateStateInLocalStorage();
    }
    canvas.addEventListener('click', paint);
    addEventRemover(paint)
}

function chooseColor() {
    removeTransform();
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
    }

    if (inputColor.value == hexColor) return;
    state.previousColor = inputColor.value;
    prevColor.dataset.color = inputColor.value;
    prevColorIdentificator.style.backgroundColor = inputColor.value;
    inputColor.value = hexColor;
    state.currentColor = hexColor;
    updateStateInLocalStorage();
}

function removeChooseColor() {
    var blocks = document.querySelectorAll('.square');
    [].forEach.call(blocks, function (e) {
        e.removeEventListener('click', checkColor);
    });
    document.body.style.cursor = "";
}

function toggleCircle (e) {
e.target.classList.toggle('circle');
let blockClasses = Array.from(e.target.classList);
let id = e.target.id;
let classesInString = blockClasses.join(" ");
state.form[id] = classesInString;
updateStateInLocalStorage();
}

function transform() {
    removeChooseColor();
    document.body.style.cursor = "url('./assets/trasform.png'), auto";
    canvas.addEventListener('click', toggleCircle);
    addEventRemover(toggleCircle)
}

function removeTransform() {
    canvas.removeEventListener('click', toggleCircle);
    document.body.style.cursor = "";
}

function move() {
    removeTransform();
    removeChooseColor();
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
            let prevBlockId = tempValue.id;
            state.order[prevBlockId] = window.getComputedStyle(this).order;
            e.target.style.order = e.dataTransfer.getData('text/html');         
            let currentBlockId = e.target.id;
            state.order[currentBlockId] = e.dataTransfer.getData('text/html');

            updateStateInLocalStorage();
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

function updateStateInLocalStorage() {
    let stateInJSON = JSON.stringify(state);
    localStorage.setItem("appState", stateInJSON);
}

function updateAppAfterReload() {
    if (localStorage["appState"]) {
        let dataFromLocalStorage = JSON.parse(localStorage.appState);

        state.currentColor = dataFromLocalStorage.currentColor;
        state.previousColor = dataFromLocalStorage.previousColor;
        inputColor.value = dataFromLocalStorage.currentColor;
        prevColor.dataset.color = dataFromLocalStorage.previousColor;
        prevColorIdentificator.style.backgroundColor = dataFromLocalStorage.previousColor;

        let allBlocks = Array.from(canvas.querySelectorAll('div'));
        for (let i = 0; i < allBlocks.length; i++) {
            allBlocks[i].className = dataFromLocalStorage.form[allBlocks[i].id];
            state.form[allBlocks[i].id] = dataFromLocalStorage.form[allBlocks[i].id];
        }

        for (let i = 0; i < allBlocks.length; i++) {
            let tempBlockById = document.getElementById(allBlocks[i].id);
            tempBlockById.style.backgroundColor = dataFromLocalStorage.color[allBlocks[i].id];
            state.color[allBlocks[i].id] = dataFromLocalStorage.color[allBlocks[i].id];
        }

        for (let i = 0; i < allBlocks.length; i++) {
            let tempBlockById = document.getElementById(allBlocks[i].id);
            tempBlockById.style.order = dataFromLocalStorage.order[allBlocks[i].id];
            state.order[allBlocks[i].id] = dataFromLocalStorage.order[allBlocks[i].id];
        }
    } 
}

let removeButton = document.getElementsByClassName("remove-button")[0];
let notification = document.getElementById("notification");
let checkBox = document.getElementById("disable-checkbox");

(function () {
    if (localStorage["checked"] == "false" || !localStorage["checked"]) {
        setTimeout(() => notification.classList.remove("hide"), 1000);
    }
})()

checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
        localStorage.setItem("checked", "true")
    } else {
        localStorage.removeItem("checked");
    }

})

removeButton.addEventListener("click", function () {
    this.parentNode.classList.add("hide");
})