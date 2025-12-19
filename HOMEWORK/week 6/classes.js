
class ClownFish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.offset = random(1000);
    this.vx = random(-1, 2)
    this.vy = random(-1, 2)
  }
  update() {
    this.x += this.vx + sin(frameCount * 0.02 + this.offset) * 0.5;
    this.y += this.vy + cos(frameCount * 0.02 + this.offset) * 0.3;

    if (this.x < 0 || this.x >= width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

  }

  display() {
    push();
    translate(this.x, this.y);

    if (this.vx > 0) scale(-1, 1);

    fill(255, 120, 0);
    stroke(255);
    strokeWeight(1.5);
    ellipse(0, 0, 20, 12);
    triangle(10, 0, 18, -6, 18, 6);
    fill(255);
    pop();
  }
}

class Anemone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI);
  }
  update() {
    this.angle += 0.02;
  }
  display() {
    push();
    translate(this.x, this.y);
    stroke(255, 100, 200);
    strokeWeight(2);
    noFill();
    let r = 20 + sin(this.angle) * 5;
    ellipse(0, 0, r, r * 1.5);
    pop();
  }
}

class CleanerShrimp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.t = random(1000);
  }
  update() {
    this.x += sin(frameCount * 0.015 + this.t) * 0.6;
    this.y += cos(frameCount * 0.02 + this.t) * 0.4;
  }
  display() {
    push();
    translate(this.x, this.y);
    stroke(255, 200, 200);
    fill(255, 100, 150);
    ellipse(0, 0, 12, 8);
    stroke(255);
    pop();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, -2);
    this.alpha = 255;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.alpha -= 3;
  }
  show() {
    noStroke();
    fill(255, 200, 100, this.alpha);
    ellipse(this.x, this.y, 4);
  }
  finished() {
    return this.alpha < 0;
  }
}