let particle = []
let PPF = 10

let gravity 

function setup() {
  createCanvas(400, 600);
  colorMode(HSB, TWO_PI, 1, 1)
  particle.push(new Particle(random(width), -1))
}

function draw() {
  background(0.1);
  for(let i=0; i< PPF; i++){
    particle.push(new Particle(random(width), 0))

    gravity = createVector(0,0.8)
  }

  // if (random()< 0.1){
  //   particle.push(new Particle(random(width), 0))
  // }

  particle.forEach((p, i)=>{
    if (!p.inBounds()){
      particle.splice(i, 1)
    }

    p.applyForce(gravity)
    p.move()
    p.display()


  })
}
