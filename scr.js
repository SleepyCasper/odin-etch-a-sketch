const gridContainer = document.querySelector('.container-grid');
const sizeRange = document.querySelector('#size-range');
const sizeValue = document.querySelector('#size-value');
const colorPicker = document.querySelector('#color');

const classic = document.querySelector('.btn-classic');
const rgb = document.querySelector('.btn-rgb');
const eraser = document.querySelector('.btn-eraser');
const clear = document.querySelector('.btn-clear');

let currentMode = 'classic';

// Shows what size is chosen
function updateSizeDisplay(value) {
  sizeValue.textContent = `${value} x ${value}`;
}

// Check if mouse down
let mousedown = false;
document.body.addEventListener("mousedown", () => (mousedown = true));
document.body.addEventListener("mouseup", () => (mousedown = false));

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
    gridContainer.appendChild(cell);

    // "Draw" in different modes
    cell.addEventListener("mouseenter", () => {
      if(mousedown) {
        if(currentMode === 'classic') {
          cell.style.backgroundColor = 'black';
        } else if(currentMode === 'erase') {
          cell.style.backgroundColor = 'white';
        }
      }
    });
  }
  
}

updateSizeDisplay(sizeRange.value);

// Update size on input
sizeRange.addEventListener("input", (event) => {
  updateSizeDisplay(event.target.value)
  createGrid(event.target.value);
});

classic.addEventListener("click", () => {
  currentMode = 'classic';
});

eraser.addEventListener("click", () => {
  currentMode = 'erase';
});

clear.addEventListener("click", () => {
  const cells = document.querySelectorAll('.grid-cell');

  cells.forEach(cell => {
    cell.style.backgroundColor = "white";
  })
})








