let handPose;
let video;
let hands = [];
let balls = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 500);
  video = createCapture(VIDEO,{flipped: true});
  video.size(640, 500);
  video.hide();
  handPose.detectStart(video, gotHands);
  

  colorMode(HSB);
  for (let i = 0; i < 20; i++) {
    balls.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      vx: random(-3, 3),
      vy: random(-3, 3),
      r: random(15, 30),
      hue: random(0, 255)
    });
  }
}

function draw() {
  colorMode(RGB);
  background(220);
  image(video, 0, 0, 640, 480);
  

  let handCircle = null;
  if (hands.length > 0) {
    let hand = hands[0];
    let fingerNames = [
      "thumb_tip",
      "index_finger_tip",
      "middle_finger_tip",
      "ring_finger_tip",
      "pinky_finger_tip"
    ];
    let points = fingerNames.map(n => hand[n]);
    
  
    colorMode(HSB);
    fill(120, 200, 255);
    noStroke();
    for (let p of points) circle(p.x, p.y, 12);
    
  
    let cx = 0, cy = 0;
    for (let p of points) {
      cx += p.x;
      cy += p.y;
    }
    cx /= points.length;
    cy /= points.length;

    let thumb = hand["thumb_tip"];
    let index = hand["index_finger_tip"];
    let angle = atan2(index.y - thumb.y, index.x - thumb.x);
    let hue = map(angle, -PI, PI, 0, 255);
    
  
    let totalDist = 0;
    for (let p of points) {
      totalDist += dist(p.x, p.y, cx, cy);
    }
    let avgDist = totalDist / points.length;
    let radius = avgDist * 0.9;
    
  
    noFill();
    stroke(hue, 200, 255);
    strokeWeight(4);
    ellipse(cx, cy, radius * 2, radius * 2);
    
  
    handCircle = { x: cx, y: cy, r: radius };
  }
  

  colorMode(HSB);
  for (let ball of balls) {
   
    ball.x += ball.vx;
    ball.y += ball.vy;
    
   
    if (ball.x - ball.r < 0 || ball.x + ball.r > width) {
      ball.vx *= -1;
      ball.x = constrain(ball.x, ball.r, width - ball.r);
    }
    if (ball.y - ball.r < 0 || ball.y + ball.r > height) {
      ball.vy *= -1;
      ball.y = constrain(ball.y, ball.r, height - ball.r);
    }
    
    
    if (handCircle) {
      let d = dist(ball.x, ball.y, handCircle.x, handCircle.y);
      let minDist = ball.r + handCircle.r;
      let maxDist = handCircle.r - ball.r;
      
     
      if (abs(d - handCircle.r) < ball.r) {
      
        let nx = (ball.x - handCircle.x) / d;
        let ny = (ball.y - handCircle.y) / d;
        
       
        let dotProduct = ball.vx * nx + ball.vy * ny;
        
       
        ball.vx -= 2 * dotProduct * nx;
        ball.vy -= 2 * dotProduct * ny;
        
       
        ball.vx += random(-0.5, 0.5);
        ball.vy += random(-0.5, 0.5);
        
      
        let speed = sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (speed > 8) {
          ball.vx = (ball.vx / speed) * 8;
          ball.vy = (ball.vy / speed) * 8;
        }
        
        
        if (d < handCircle.r) {
          
          ball.x = handCircle.x + nx * (handCircle.r + ball.r + 2);
          ball.y = handCircle.y + ny * (handCircle.r + ball.r + 2);
        } else {
          
          ball.x = handCircle.x + nx * (handCircle.r + ball.r + 2);
          ball.y = handCircle.y + ny * (handCircle.r + ball.r + 2);
        }
      }
    }
    
    fill(ball.hue, 200, 255);
    stroke(ball.hue, 255, 200);
    strokeWeight(2);
    circle(ball.x, ball.y, ball.r * 2);
    
  }
}

function gotHands(results) {
  hands = results;
}


function mousePressed() {
  colorMode(HSB);
  balls.push({
    x: mouseX,
    y: mouseY,
    vx: random(-3, 3),
    vy: random(-3, 3),
    r: random(15, 30),
    hue: random(0, 255)
  });
}
