let fish = [];
let anemones = [];
let shrimp = [];
let particles = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 5; i++) {
    fish.push(new ClownFish(random(width), random(height)));
    anemones.push(new Anemone(random(width), random(height)));
    shrimp.push(new CleanerShrimp(random(width), random(height)));
  }
}

function draw() {
  background(20, 40, 80);
  

  for (let a of anemones) {
    a.update();
    a.display();
  }

  for (let f of fish) {
    f.update();
    f.display();
  }

  for (let s of shrimp) {
    s.update();
    s.display();
  }

  for (let f of fish) {
    for (let a of anemones) {
      let d = dist(f.x, f.y, a.x, a.y);
      if (d < 100) {
        stroke(255, 150, 0, 120);
        line(f.x, f.y, a.x, a.y);
      }
    }
  }


  for (let f of fish) {
    for (let s of shrimp) {
      let d2 = dist(f.x, f.y, s.x, s.y);
      if (d2 < 100) {
        stroke(150, 200, 255, 150);
        line(f.x, f.y, s.x, s.y);
        if (random() < 0.2) {
          particles.push(new Particle(f.x, f.y));
        }
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();
    if (p.finished()) {
      particles.splice(i, 1);
    }
  }
}
