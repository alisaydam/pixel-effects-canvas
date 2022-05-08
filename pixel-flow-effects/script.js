const myImage = new Image();
myImage.src = "image1.jpg";

myImage.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 750;
  canvas.height = 983;
  const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient1.addColorStop(0.2, "pink");
  gradient1.addColorStop(0.3, "red");
  gradient1.addColorStop(0.4, "orange");
  gradient1.addColorStop(0.5, "yellow");
  gradient1.addColorStop(0.6, "green");
  gradient1.addColorStop(0.7, "turquoise");
  gradient1.addColorStop(0.8, "violet");

  const letters = ["M", "A", "N"];
  let swithcer = 1;
  let counter = 0;
  setInterval(function () {
    counter++;
    if (counter % 12 === 0) {
      swithcer *= -1;
    }
  }, 500);

  ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let particlesArray = [];
  const numberofParticles = 7000;

  let mappedImage = [];

  for (let y = 0; y < canvas.height; y++) {
    let row = [];
    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[y * 4 * pixels.width + x * 4];
      const green = pixels.data[y * 4 * pixels.width + x * 4 + 1];
      const blue = pixels.data[y * 4 * pixels.width + x * 4 + 2];
      const brightness = calculateRelativeBrightness(red, green, blue);
      const cell = [
        (cellBrightness = brightness),
        (cellColor = "rgb(" + red + "," + green + "," + blue + ")"),
      ];
      row.push(cell);
    }
    mappedImage.push(row);
  }
  function calculateRelativeBrightness(r, g, b) {
    return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = 0;
      this.velocity = Math.random() * 0.5;
      // this.size = Math.random() * 1.5 + 1;
      this.size = Math.random() * 2.5 + 0.2;
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      this.angle = 0;
      this.letter = letters[Math.floor(Math.random() * letters.length)];
      this.random = Math.random();
    }
    update() {
      this.position1 = Math.floor(this.y);
      this.position2 = Math.floor(this.x);
      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        this.speed = mappedImage[this.position1][this.position2][0];
      }
      let movement = 2.5 - this.speed + this.velocity;
      this.angle += this.speed / 20;
      this.size = this.speed * 1.5;

      // if (swithcer === 1) {
      //   ctx.globalCompositeOperation = "luminosity";
      // } else {
      //   ctx.globalCompositeOperation = "soft-light";
      // }
      // if (counter % 10 === 0) {
      //   this.x = Math.random() * canvas.width;
      //   this.y = 0;
      // }

      this.y -= movement;
      this.x += movement + Math.sin(this.angle) * 2;
      if (this.y <= 0) {
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
      }
      if (this.x >= canvas.width) {
        this.x = 0;
        this.y = Math.random() * canvas.height;
      }
    }
    draw() {
      ctx.beginPath();
      if (
        mappedImage[this.position1] &&
        mappedImage[this.position1][this.position2]
      ) {
        ctx.fillStyle = mappedImage[this.position1][this.position2][1];
        ctx.strokeStyle = mappedImage[this.position1][this.position2][1];
      }
      // ctx.fillStyle = gradient1;
      // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // ctx.strokeRect(this.x, this.y, this.size * 3, this.size * 3);
      // ctx.font = "20px Arial";
      // if (this.random < 0.02) ctx.fillText(this.letter, this.x, this.y);
      // else ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function init() {
    for (let i = 0; i < numberofParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  init();
  function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      // ctx.globalAlpha = particlesArray[i].speed * 0.5;
      ctx.globalAlpha = 1;
      particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
