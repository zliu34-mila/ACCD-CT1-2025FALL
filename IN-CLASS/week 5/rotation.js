
function setup(){
    createCanvas(600,600)
    colorMode(HSB, TWO_PI, 1, 1)
}


function draw(){
    background(TWO_PI * 0.75, 0.2, 0.9)


    push()
    rotate(QUARTER_PI * 0.2)
    drawGrid(20);
    pop()

    push()
    translate(width * 0.5, height * 0.5)
    rotate(QUARTER_PI)
    drawGrid(20);
    rect(0, 0, 100, 100)
    pop()

}


function drawGrid(numLines){
    for(let y = 0; y <= numLines; y++) {
        line(0, y * height/numLines, width, y * height/numLines);
    }

    for(let x = 0; x <= numLines; x++) {
        line(x * width/numLines, 0, x * width/numLines, height);
    }

}