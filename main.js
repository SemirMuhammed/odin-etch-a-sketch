// Draw Canvas Grid

const canvas = document.getElementById("canvas");
const gridSize = document.getElementById("grid-size").value

for (let i = 0; i < (gridSize ** 2); i++) {
	const grid = document.createElement("div");

	grid.classList.add("square-grid");
	grid.style.width = `calc(100% / ${gridSize})`;
	grid.style.height = grid.style.width;
	canvas.appendChild(grid);
}

