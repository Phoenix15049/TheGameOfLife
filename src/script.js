const rows = 50;
const cols = 50;
let grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
let playing = false;
let interval;

function createGrid() {
  const gridElement = document.getElementById('grid');
  gridElement.innerHTML = '';
  grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.addEventListener('click', () => toggleCell(rowIndex, colIndex));
      gridElement.appendChild(cellElement);
    });
  });
}

function toggleCell(row, col) {
  grid[row][col] = grid[row][col] ? 0 : 1;
  updateGrid();
}

function updateGrid() {
  const cells = document.getElementsByClassName('cell');
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells[row * cols + col].style.backgroundColor = grid[row][col] ? '#333' : '#fff';
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      if (row + i >= 0 && row + i < rows && col + j >= 0 && col + j < cols) {
        count += grid[row + i][col + j];
      }
    }
  }
  return count;
}

function nextGeneration() {
  const newGrid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(row, col);
      if (grid[row][col]) {
        newGrid[row][col] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        newGrid[row][col] = neighbors === 3 ? 1 : 0;
      }
    }
  }
  grid = newGrid;
  updateGrid();
}

function startGame() {
  if (!playing) {
    playing = true;
    interval = setInterval(nextGeneration, 100);
  }
}

function stopGame() {
  playing = false;
  clearInterval(interval);
}

createGrid();
