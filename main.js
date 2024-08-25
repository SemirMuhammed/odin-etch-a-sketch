// Draw Canvas Grid

const canvas = document.getElementById("canvas");

function drawCanvas(newCanvas = false) {
	if (!newCanvas) {
		const gridTotal = document.querySelectorAll(".square-grid");

		gridTotal.forEach((element) => {
			element.remove();
		})
	}

	const gridSize = document.getElementById("grid-size").value

	if (gridSize > 100) return alert("Canvas < 100");

	for (let i = 0; i < (gridSize ** 2); i++) {
		const grid = document.createElement("div");

		grid.classList.add("square-grid");
		grid.style.width = `calc(100% / ${gridSize})`;
		canvas.appendChild(grid);
	}
}

drawCanvas(true);

// Change Canvas Grid

const changeGridBtn = document.getElementById("change-grid-btn");

changeGridBtn.addEventListener("click", drawCanvas);

// Draw on Canvas

let isDrawing = false;

canvas.addEventListener("mousedown", () => isDrawing = true)

canvas.addEventListener("mousemove", (event) => {
	if (!isDrawing) return;

	event.target.classList.add("fill-color");
	window.getSelection().removeAllRanges();
})

window.addEventListener("mouseup", () => isDrawing = false)
window.addEventListener("contextmenu", (event) => event.preventDefault())
