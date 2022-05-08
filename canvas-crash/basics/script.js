const canvas = document.getElementById("canvas1");

//* Holds the reference to actual canvas element, we also can use "webgl" instead og 2d
//* getContext only works if called on canvas element
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(100, 100, 110, 110);
});

const mouse = {
  x: null,
  y: null,
};
canvas.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  //   drawCircle();
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  //   drawCircle();
});

const drawCircle = () => {
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  requestAnimationFrame(animate);
}

animate();

ctx.fillStyle = "blue";
ctx.strokeStyle = "red";
ctx.lineWidth = 15;
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.stroke();
ctx.fill();
console.log(ctx);
