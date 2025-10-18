let thisCanvas = document.
getElementById('starfield')

let posX = []
let posY = []
let size = []
let numStars = 1000

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);

  for(let i = 0; i < numStars; i++) {
    posX.push(random(width))
    posY[i] = random(height)
    size.push(random(2, 5))
  }

}

function draw() {
  background(0, 0, 0)
  fill(0, 0, 100)
  for(let i = 0; i < numStars; i++) {
    circle(posX[i], posY[i], random(size[i], size[1]+1));
  }
  
}




