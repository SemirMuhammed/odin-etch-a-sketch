// Draw Canvas Grid

const canvas = document.getElementById("canvas");
const bgColor = document.getElementById("bg-color");

canvas.style.backgroundColor = bgColor.value;
bgColor.addEventListener("input", () => {
	canvas.style.backgroundColor = bgColor.value;
})

function drawCanvas(newCanvas = false) {
	if (!newCanvas) {
		const gridTotal = document.querySelectorAll(".square-grid");

		gridTotal.forEach((element) => {
			element.remove();
		})
	}

	const gridSize = document.getElementById("grid-size").value

	if (gridSize > 100) return alert("ERROR: Grid Size Too Large");

	for (let i = 0; i < (gridSize ** 2); i++) {
		const grid = document.createElement("div");

		grid.classList.add("square-grid");
		grid.classList.add("grid-show");
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
let opacity = 10;
let isTransparent = false;

canvas.addEventListener("mousedown", () => isDrawing = true)

canvas.addEventListener("mousemove", (event) => {
	if (!isDrawing) return;

	let color = "black";
	if (isRainbowMode) {
		const randomRed = (Math.random() * 255).toFixed();
		const randomBlue = (Math.random() * 255).toFixed();
		const randomGreen = (Math.random() * 255).toFixed();

		color = `rgba(${randomRed}, ${randomBlue}, ${randomGreen}, 0.5)`;
	}
	else if (isColorMode) {
		color = document.getElementById("pen-color").value;
	}
	else {
		//color = document.getElementById("bg-color").value;
		color = "transparent";
	}

	if (isShadowMode) {
		if (opacity == 10) isTransparent = false;
		if (opacity == 0) isTransparent = true;

		(isTransparent) ? opacity++ : opacity--;
		event.target.style.opacity = `${opacity * 10}%`;
	}
	window.getSelection().removeAllRanges();
	event.target.style.backgroundColor = color;
})

window.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

let isRainbowMode = false;
let isColorMode = true;
let isEraserMode = false;
let isShadowMode = false;
let isGridMode = true;

const colorMode = document.getElementById("color-mode");
const rainbow = document.getElementById("rainbow");
const shadow = document.getElementById("shadow");
const gridHide = document.getElementById("hide-grid");
const eraser = document.getElementById("eraser");
const clearCanvas = document.getElementById("clear-canvas");

colorMode.style.backgroundColor = "#5dae74";
gridHide.style.backgroundColor = "#5dae74";

colorMode.addEventListener("click", () => {
	if (isColorMode) return;

	isRainbowMode = false;
	isColorMode = true;
	isEraserMode = false;

	colorMode.style.backgroundColor = "#5dae74";
	rainbow.style.backgroundColor = "#cdfee4";
	eraser.style.backgroundColor = "#cdfee4";
})

rainbow.addEventListener("click", () => {
	if (isRainbowMode) return;

	isRainbowMode = true;
	isColorMode = false;
	isEraserMode = false;

	rainbow.style.backgroundColor = "#5dae74";
	colorMode.style.backgroundColor = "#cdfee4";
	eraser.style.backgroundColor = "#cdfee4";
})

shadow.addEventListener("click", () => {
	if (isShadowMode) {
		isShadowMode = false;
		shadow.style.backgroundColor = "#cdfee4";
		canvas.style.opacity = "100%"
		return;
	}

	isShadowMode = true;

	shadow.style.backgroundColor = "#5dae74";
})

gridHide.addEventListener("click", () => {
	const gridTotal = document.querySelectorAll(".square-grid");
	if (isGridMode) {
		gridTotal.forEach((element) => {
			element.classList.remove("grid-show");
		})

		isGridMode = false;
		gridHide.style.backgroundColor = "#cdfee4";
		return;
	}
	gridTotal.forEach((element) => {
		element.classList.add("grid-show");
	})
	isGridMode = true;

	gridHide.style.backgroundColor = "#5dae74";
})

eraser.addEventListener("click", () => {
	if (isEraserMode) return;

	isRainbowMode = false;
	isColorMode = false;
	isEraserMode = true;

	eraser.style.backgroundColor = "#5dae74";
	colorMode.style.backgroundColor = "#cdfee4";
	rainbow.style.backgroundColor = "#cdfee4";
})

clearCanvas.addEventListener("click", () => {
	const gridTotal = document.querySelectorAll(".square-grid");

	gridTotal.forEach((element) => {
		element.style.backgroundColor = "transparent";
	})
})
