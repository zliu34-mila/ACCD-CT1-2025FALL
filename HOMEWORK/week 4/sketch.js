let bubbles = [];

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  for (let i = 0; i < 30; i++) {
    let bubble = {
      x: random(width),
      y: random(height),
      xMove: random(2000),
      yMove: random(2000),
      size: random(10, 40),
      speed: random(0.001, 0.008),
      hue: random(180, 260)
    };
    bubbles.push(bubble);
  }
}
s
function draw() {
  background(220,20,12,0.2); 

  for (let b of bubbles) {
    b.x = noise(b.xMove) * width;
    b.y = noise(b.yMove) * height;

    fill(b.hue, 80, 100, 0.6);
    circle(b.x, b.y, b.size);

    b.xMove += b.speed;
    b.yMove += b.speed * 0.5;
  }
}