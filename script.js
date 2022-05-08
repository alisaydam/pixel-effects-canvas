const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.width;
canvas.height = window.height;

let particleArray = [];

let mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mouseover", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
