const container = document.querySelector(".container");
const gridsize = document.querySelector(".gridsize");
const resetButton = document.querySelector(".reset");
const eraserButton = document.querySelector(".eraser")
const penButton = document.querySelector(".pen");
let size;
let squares = [];
let isErasing = false;
let isDrawing = false;
const colorButton = document.querySelector(".color");
const colorPicker = document.querySelector("#color__picker")
let currentColor = colorPicker.value;


//responsible for grid size
gridsize.addEventListener('click', () => {
    const userInput = prompt("Grid size: ");
    if (userInput != null && userInput <= 100 && !isNaN(userInput)) {
        size = parseInt(userInput);
        console.log('Grid size:', size);
        createGrid(size);
    } else {
        alert('invalid input! please try again');
    }
});


//responsible for logic of holding the mouse to draw
container.addEventListener('mousedown', () => {
    isDrawing = true;
});

container.addEventListener('mouseup', () => {
    isDrawing = false;
});

container.addEventListener('mouseleave', () => {
    isDrawing = false;
});


//responsible for creating the actual grid
function createGrid(size) {
    container.innerHTML = '';
    squares = [];
    for (let i = 1; i <= size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);

        square.addEventListener('mouseover', () => {
            if (isDrawing) {
                square.style.backgroundColor = isErasing ? 'white' : currentColor;
            }
        });
        
        squares.push(square);
    }

    document.querySelectorAll('.square').forEach(square => {
        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;

    });

    eraserButton.addEventListener('click', () => {
        isErasing = true
    });

    penButton.addEventListener('click', () => {
        isErasing = false;
    });
}

//Clear button
resetButton.addEventListener('click', () => {
    if (!size) {
        size = 16;
        createGrid(size);
    } else {
        createGrid(size);
    }
});



colorButton.addEventListener('click', () => {
    colorPicker.click();
});

colorPicker.addEventListener('input', (event) => {
    currentColor = event.target.value;
});


//initialize grid before anything happens
createGrid(16);