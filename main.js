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

const gridSize = document.getElementById("grid-size");
const gridSizeDisplay = document.querySelector(".change-canvas-grid p");
let isSizing = false;

gridSize.addEventListener("mousedown", () => isSizing = true)
gridSize.addEventListener("mousemove", () => {
	if (!isSizing) return;

	gridSizeDisplay.textContent = gridSize.value;
});
window.addEventListener("mouseup", () => isSizing = false);
gridSize.addEventListener("click", () => {
	gridSizeDisplay.textContent = gridSize.value;
	drawCanvas()
});

// Draw on Canvas

let isDrawing = false;

canvas.addEventListener("mousedown", () => isDrawing = true)

canvas.addEventListener("mousemove", (event) => {
	if (!isDrawing) return;

	let color = "black";
	const rainbow = document.getElementById("rainbow");

	if (rainbow.checked) {
		const randomRed = (Math.random() * 255).toFixed();
		const randomBlue = (Math.random() * 255).toFixed();
		const randomGreen = (Math.random() * 255).toFixed();

		color = `rgb(${randomRed}, ${randomBlue}, ${randomGreen})`;
	}
	else {
		color = document.getElementById("fill-color").value;
	}

	window.getSelection().removeAllRanges();
	event.target.style.backgroundColor = color;
})

window.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("contextmenu", (event) => event.preventDefault());
