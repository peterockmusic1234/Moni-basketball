const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Ball
let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    dx: 0,
    dy: 0,
    gravity: 0.5
};

// Hoop
let hoop = {
    x: canvas.width / 2 - 30,
    y: 100,
    width: 60,
    height: 10
};

// Score
let score = 0;

// Shoot on click
canvas.addEventListener("click", () => {
    ball.dy = -8;
    ball.dx = (Math.random() - 0.5) * 4;
});

// Game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hoop
    ctx.fillStyle = "#ff9800";
    ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();

    // Gravity
    ball.dy += ball.gravity;
    ball.y += ball.dy;
    ball.x += ball.dx;

    // Bounce on floor
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.dy *= -0.7;
    }

    // Score check
    if (
        ball.y - ball.radius <= hoop.y + hoop.height &&
        ball.x > hoop.x &&
        ball.x < hoop.x + hoop.width &&
        ball.dy < 0
    ) {
        score++;
        resetBall();
    }

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(draw);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    ball.dx = 0;
    ball.dy = 0;
}

draw();