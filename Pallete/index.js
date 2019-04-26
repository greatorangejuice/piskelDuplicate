let firstPallete = document.querySelector("#first-pallete");
let canvas = document.querySelector('.canvas');
let secondPallete = document.querySelector("#second-pallete");
let currentColor = document.querySelector('#current-color');
let prevColor = document.querySelector('#previous-color');
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
});

function paintBucket() {
    console.log('paintBucket function work');
    const paint = (e) => {
        console.log(e.target.style.backgroundColor = currentColor.dataset.color)
    }
    canvas.addEventListener('click', paint);
    removeEvent(paint)
}

function chooseColor() {
    console.log(`chooseColor function work`);

    secondPallete.addEventListener("click", (e) => {
        let target = e.target;
        while (target != this) {
            if (target.tagName == 'BUTTON') {
                let color = e.target.dataset.color;
                let buttonValue = e.target.dataset.id
                switch (buttonValue) {
                    case 'current':
                        console.log(`Choosed current color!`);
                        break;
                    case 'previous':
                        currentColor.dataset.color = color;
                        console.log(`Choosed`, color);
                        break;
                    case 'red':
                        prevColor.dataset.color = currentColor.dataset.color;
                        console.log(prevColor.dataset.color);
                        currentColor.dataset.color = 'red'
                        console.log(`Choosed`, color);
                        break;
                    case 'blue':
                        prevColor.dataset.color = currentColor.dataset.color;
                        currentColor.dataset.color = 'blue'
                        console.log(`Choosed`, color);
                        break;
                }
                return;
            }
            target = target.parentNode;
        }
    })

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