const GRID_SIZE_DEFAULT = 16;
const btnHoverBackground = '#FFC8DD';
const btnHoverBorder = '#FFAFCC';

const gridContainer = document.querySelector('.container-grid');
const sizeRange = document.querySelector('#size-range');
const sizeValue = document.querySelector('#size-value');
const colorPicker = document.querySelector('#color');

const classic = document.querySelector('.btn-classic');
const rgb = document.querySelector('.btn-rgb');
const eraser = document.querySelector('.btn-eraser');
const clear = document.querySelector('.btn-clear');

let currentMode = 'classic';
let currentColor = 'black';

// Shows what size is chosen
function updateSizeDisplay(value) {
  sizeValue.textContent = `${value} x ${value}`;
}

// Check if mouse down
let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

// Creates grid
function createGrid(size) {
  // Clear existing grid
  gridContainer.innerHTML = '';

  const totalCells = size * size;
  const cellSize = 600 / size;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.style.border ='#BD9FD0 solid 1px';
    gridContainer.appendChild(cell);
    cell.addEventListener('mouseover', changeColor);
    cell.addEventListener('mousedown', changeColor);
  }
}

// "Draw" in different modes
function changeColor(e) {
  e.preventDefault();
  if (e.type === 'mouseover' && !mousedown) return;
  switch(currentMode) {
    case 'classic':
      e.target.style.backgroundColor = currentColor;
      break;
    case 'erase':
      e.target.style.backgroundColor = 'white';
      break;
    case 'rainbow':
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  }
}

function buttonChangeColor () {
  classic.style.backgroundColor = '';
  classic.style.borderColor = '';
  rgb.style.backgroundColor = '';
  rgb.style.borderColor = '';
  eraser.style.backgroundColor = '';
  eraser.style.borderColor = '';

  switch(currentMode) {
    case 'classic':
      classic.style.backgroundColor = btnHoverBackground;
      classic.style.borderColor = btnHoverBorder;
      break;
    case 'rainbow':
      rgb.style.backgroundColor = btnHoverBackground;
      rgb.style.borderColor = btnHoverBorder;
      break;
    case 'erase':
      eraser.style.backgroundColor = btnHoverBackground;
      eraser.style.borderColor = btnHoverBorder;
      break;
  }
}

function initialize () {
  createGrid(GRID_SIZE_DEFAULT);
  updateSizeDisplay(GRID_SIZE_DEFAULT);
  buttonChangeColor();
}

// Update size on input
sizeRange.addEventListener("input", (event) => {
  updateSizeDisplay(event.target.value)
  createGrid(event.target.value);
  currentMode = 'classic';
});

//Picks a color
colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;
});

classic.addEventListener("click", () => {
  currentMode = 'classic';
  buttonChangeColor();
});

eraser.addEventListener("click", () => {
  currentMode = 'erase';
  buttonChangeColor();
});

rgb.addEventListener("click", () => {
  currentMode = 'rainbow';
  buttonChangeColor();
}
)

clear.addEventListener("click", () => {
  const cells = document.querySelectorAll('.grid-cell');

  cells.forEach(cell => {
    cell.style.backgroundColor = "white";
  })
})

initialize();








