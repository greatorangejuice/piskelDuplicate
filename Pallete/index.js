let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');

// Удаление слушателя
const removeEvent = (func) => {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == "27") {
            canvas.removeEventListener('click', func);
            console.log(`Removed`);
        }
    })
}

firstPallete.addEventListener("click", (e) => {
    let target = e.target;
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
})

function paintBucket() {
    console.log('paintBucket function work');
}

function chooseColor() {
    console.log(`chooseColor function work`);
}

function move() {
    console.log(`move function work`);
    canvas.addEventListener("mousedown", (e) => {
        canvas.style.position = 'absolute';
    })
}

function transform() {
    console.log(`transform function work`);
        const toggleCircle = (e) => {
        e.target.classList.toggle('circle');
    }
    canvas.addEventListener('click', toggleCircle);
    removeEvent(toggleCircle)
}