let numArcs = 10
let initRadius
let strWeight = 10
let myText = ""
let outCir = 0

function preload() {

  Lines = loadStrings('myText.txt')
}

function setup() {
  createCanvas(800, 800)
  colorMode(HSB, TWO_PI, 1, 1)
  initRadius = width * 0.1
  textAlign(CENTER, CENTER)
  textSize(20)
  noStroke()
  myText = Lines.join(' ')
}

function draw() {
  background(0)

  for (let i = 0; i < numArcs; i++) {
    fill(color(i * TWO_PI / numArcs, 0.9, 1))

    push()
    translate(width * 0.5, height * 0.5)

    rotate(sin(millis() * 0.0004 * (i * 0.8 + 0.5) + i * TWO_PI))

    let radius = initRadius + i * strWeight * 2
    let indexOffset = (frameCount * 0.15 + i * 10) % myText.length

    for (let j = 0; j < 36; j++) {
      push()
      rotate((TWO_PI / 36) * j)
      translate(0, -radius)
      let charIndex = (indexOffset + j) % myText.length
      text(myText.charAt(charIndex), 0, 0)
      pop()
    }
    pop()
  }

  push()
  translate(width * 0.5, height * 0.5)
  rotate(millis() * 0.001)

  stroke(color(millis() * 0.001 % TWO_PI, 1, 1))
  strokeWeight(1)
  noFill()

  beginShape()
  for(let angle = 0; angle < TWO_PI; angle = angle + 1){
    let randomangle = angle + random(-0.5, 0.5)
    let noiseValue = noise(cos(randomangle) * 2 + outCir, sin(randomangle) * 2 + outCir)
    let r = initRadius + numArcs * strWeight * 2 + 50 + noiseValue * 100
    let x = cos(randomangle) * r
    let y = sin(randomangle) * r
    vertex(x, y) 
  }

  endShape(CLOSE)
  pop()

outCir += 0.01
}