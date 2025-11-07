let particle = []

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, TWO_PI, 1, 1)
  // for(let i = 0; i<10;i++){
  //   particle.push(new Particle())
  // }

}

function draw() {
  background(0.1);

  particle.forEach((Bob,i)=>{
    Bob.move()
    Bob.bounce()
    Bob.display()
  })
  
}

function mouseReleased(){
  particle.push(new Particle(mouseX, mouseY))
}


