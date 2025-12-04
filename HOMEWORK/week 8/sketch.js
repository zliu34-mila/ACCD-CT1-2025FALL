let handPose;
let video;
let hands = [];
function preload() {
  handPose = ml5.handPose();
}
function setup() {
  createCanvas(640, 500);
  video = createCapture(VIDEO);
  video.size(640, 500);
  video.hide();
  handPose.detectStart(video, gotHands);
}
function draw() {
  background(220);
  image(video, 0, 0, 640, 480);
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
    fill(0, 255, 0);
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
  }
}
function gotHands(results) {
  hands = results;
}