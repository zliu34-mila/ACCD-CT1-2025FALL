import processing.serial.*;

Serial myPort;
String portName = "COM3";

float ballX, ballY;
float ballSize = 50;
float ballSpeed = 5;


color[] colors = {
  color(255, 100, 100),
  color(100, 255, 100),
  color(100, 100, 255), 
  color(255, 255, 100),
  color(255, 100, 255), 
  color(100, 255, 255) 
};
int currentColorIndex = 0;
color ballColor;



float angle = 0;
float xComponent = 0;
float yComponent = 0;
int buttonPressed = 0;
int lastButtonState = 0;

void setup() {
  size(800, 600);
  

  ballX = width / 2;
  ballY = height / 2;
  ballColor = colors[currentColorIndex];
  

  println("可用串口:");
  printArray(Serial.list());
  

  try {
    myPort = new Serial(this, portName, 115200);
    myPort.bufferUntil('\n');
  } catch (Exception e) {
    println("无法打开串口: " + portName);
    println("请修改代码中的 portName 变量");
  }
  
  smooth();
}

void draw() {
  background(240);
  
  // 根据旋转角度移动球
  ballX += xComponent * ballSpeed;
  ballY += yComponent * ballSpeed;
  
  // 边界检测
  ballX = constrain(ballX, ballSize/2, width - ballSize/2);
  ballY = constrain(ballY, ballSize/2, height - ballSize/2);
  
  // 绘制球
  fill(ballColor);
  stroke(0);
  strokeWeight(3);
  ellipse(ballX, ballY, ballSize, ballSize);
  
  // 绘制方向指示器（显示摇杆角度）
  pushMatrix();
  translate(width - 100, 100);
  
  // 外圈
  noFill();
  stroke(150);
  strokeWeight(2);
  circle(0, 0, 80);
  
  // 方向线
  stroke(255, 0, 0);
  strokeWeight(3);
  float indicatorX = cos(radians(angle)) * 35;
  float indicatorY = -sin(radians(angle)) * 35;
  line(0, 0, indicatorX, indicatorY);
  
  // 方向点
  fill(255, 0, 0);
  noStroke();
  circle(indicatorX, indicatorY, 10);
  
  popMatrix();
  
  // 显示信息
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Angle: " + nf(angle, 0, 1) + " deg", 10, 20);
  text("X: " + nf(xComponent, 0, 2), 10, 40);
  text("Y: " + nf(yComponent, 0, 2), 10, 60);
  text("Button: " + (buttonPressed == 1 ? "Pressed" : "Released"), 10, 80);
  text("Ball: (" + int(ballX) + ", " + int(ballY) + ")", 10, 100);
  text("Color: " + (currentColorIndex + 1) + "/" + colors.length, 10, 120);
  
  // 方向提示
  textAlign(RIGHT);
  text("Direction", width - 10, 160);
  
  // 显示连接状态
  if (myPort == null) {
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(24);
    text("Not Connected to Serial Port", width/2, height - 30);
  }
}

void serialEvent(Serial p) {
  String data = p.readStringUntil('\n');
  
  if (data != null) {
    data = trim(data);
    String[] values = split(data, ',');
    
    if (values.length == 4) {
      angle = float(values[0]);
      xComponent = float(values[1]);
      yComponent = float(values[2]);
      buttonPressed = int(values[3]);
      
      // 检测按钮按下（边缘触发）
      if (buttonPressed == 1 && lastButtonState == 0) {
        // 切换颜色
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        ballColor = colors[currentColorIndex];
      }
      
      lastButtonState = buttonPressed;
    }
  }
}

void keyPressed() {
  // 按空格键重置球的位置
  if (key == ' ') {
    ballX = width / 2;
    ballY = height / 2;
  }
}
