const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = { x: 200, y: 500, r: 15, dx: 0, dy: 0 };
let hoop = { x: 150, y: 60, w: 100, h: 10 };
let score = 0;
let scoreEffect = 0;

document.addEventListener('click', shoot);

function drawBall() {
  // Draw basketball with shading
  let gradient = ctx.createRadialGradient(ball.x, ball.y, 5, ball.x, ball.y, ball.r);
  gradient.addColorStop(0, "#ff9933");
  gradient.addColorStop(1, "#cc6600");
  
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
  
  // Black lines on basketball
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(ball.x - ball.r, ball.y);
  ctx.lineTo(ball.x + ball.r, ball.y);
  ctx.moveTo(ball.x, ball.y - ball.r);
  ctx.lineTo(ball.x, ball.y + ball.r);
  ctx.stroke();
}

function drawHoop() {
  // Backboard
  ctx.fillStyle = "white";
  ctx.fillRect(hoop.x + 35, hoop.y - 20, 30, 20);
  
  // Rim
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(hoop.x + hoop.w / 2, hoop.y, hoop.w / 2, 0, Math.PI, false);
  ctx.stroke();
  
  // Net
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  for (let i = 0; i < hoop.w; i += 10) {
    ctx.beginPath();
    ctx.moveTo(hoop.x + i, hoop.y);
    ctx.lineTo(hoop.x + hoop.w / 2, hoop.y + 20);
    ctx.stroke();
  }
}

function shoot() {
  if (ball.dy === 0) {
    ball.dy = -5;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBall();
  drawHoop();
  
  ball.y += ball.dy;
  
  // Reset if missed
  if (ball.y < 0) {
    ball.y = 500;
    ball.dy = 0;
  }
  
  // Score detection
  if (
    ball.y < hoop.y + hoop.h &&
    ball.x > hoop.x &&
    ball.x < hoop.x + hoop.w &&
    ball.dy < 0
  ) {
    score++;
    scoreEffect = 20; // Trigger animation
    document.getElementById("score").innerText = "Score: " + score;
    ball.y = 500;
    ball.dy = 0;
  }
  
  // Score effect animation
  if (scoreEffect > 0) {
    ctx.fillStyle = "yellow";
    ctx.font = "20px Arial";
    ctx.fillText("+1!", ball.x - 10, ball.y - 20);
    scoreEffect--;
  }
  
  requestAnimationFrame(update);
}

update();