import processing.sound.*;
import processing.serial.*;

// 串口
Serial connection;

// 鼓声
SoundFile BassDrum;
SoundFile SnareDrum;
SoundFile HiHat;
SoundFile ClosedHiHat;

// 背景音乐数组
SoundFile[] bgMusics;
int currentMusicIndex = -1;

// 入场音乐
SoundFile basicMusic;

// 语音
SoundFile voice1;
SoundFile voice2;

// 按钮触发状态
boolean[] drumFlags = {true, true, true, true};
boolean voice1Flag = true;
boolean voice2Flag = true;

// Slide控制音量
float currentVolume = 0.5;

// 音乐振幅分析
Amplitude amp;

// 光棱镜晶体球参数
int prismDetail = 40;
float[][] sphereVertices;

void setup() {
  size(600, 600, P3D);

  // 鼓声
  BassDrum = new SoundFile(this, "BT0A0A7.WAV");
  SnareDrum = new SoundFile(this, "CSHD0.WAV");
  HiHat = new SoundFile(this, "HHCD0.WAV");
  ClosedHiHat = new SoundFile(this, "ST7T3S7.WAV");

  // 背景音乐
  bgMusics = new SoundFile[3];
  bgMusics[0] = new SoundFile(this, "change1.MP3");
  bgMusics[1] = new SoundFile(this, "change2.MP3");
  bgMusics[2] = new SoundFile(this, "change3.MP3");

  bgMusics[0].loop();
  currentMusicIndex = 0;

  // 入场音乐
  basicMusic = new SoundFile(this, "basicmusic.MP3");

  // 语音
  voice1 = new SoundFile(this, "voice1.MP3");
  voice2 = new SoundFile(this, "voice2.MP3");

  // 串口
  printArray(Serial.list());
  connection = new Serial(this, Serial.list()[0], 115200);
  connection.bufferUntil('\n');

  // 振幅分析
  amp = new Amplitude(this);
  amp.input(bgMusics[currentMusicIndex]);

  // 初始化光棱镜顶点
  sphereVertices = new float[prismDetail * prismDetail][3];
  int idx = 0;
  for (int i = 0; i < prismDetail; i++) {
    float theta = map(i, 0, prismDetail - 1, 0, PI);
    for (int j = 0; j < prismDetail; j++) {
      float phi = map(j, 0, prismDetail - 1, 0, TWO_PI);
      sphereVertices[idx][0] = sin(theta) * cos(phi);
      sphereVertices[idx][1] = sin(theta) * sin(phi);
      sphereVertices[idx][2] = cos(theta);
      idx++;
    }
  }
}

void draw() {
  background(0);
  lights();

  // 光棱镜晶体球随振幅变化
  float level = amp.analyze();
  float baseRadius = 150;
  float dynamic = map(level, 0, 0.5, 0, 100);

  pushMatrix();
  translate(width / 2, height / 2, 0);
  strokeWeight(2);
  for (int i = 0; i < sphereVertices.length; i++) {
    float x = sphereVertices[i][0] * (baseRadius + random(-dynamic, dynamic));
    float y = sphereVertices[i][1] * (baseRadius + random(-dynamic, dynamic));
    float z = sphereVertices[i][2] * (baseRadius + random(-dynamic, dynamic));
    stroke(map(i % prismDetail, 0, prismDetail, 50, 255),
           map(level * 500, 0, 255, 50, 255),
           255);
    point(x, y, z);
  }
  popMatrix();
}

void serialEvent(Serial conn) {
  try {
    String incoming = conn.readStringUntil('\n');
    if (incoming == null) return;
    incoming = trim(incoming);
    if (incoming.length() == 0) return;

    String[] values = split(incoming, ',');
    if (values.length != 8) return;

    // ---------- 按钮 ----------
    if (int(values[0]) == 0 && drumFlags[0]) { BassDrum.play(); drumFlags[0] = false; } 
    else if (int(values[0]) == 1) drumFlags[0] = true;

    if (int(values[1]) == 0 && drumFlags[1]) { SnareDrum.play(); drumFlags[1] = false; } 
    else if (int(values[1]) == 1) drumFlags[1] = true;

    if (int(values[2]) == 0 && drumFlags[2]) { HiHat.play(); drumFlags[2] = false; } 
    else if (int(values[2]) == 1) drumFlags[2] = true;

    if (int(values[3]) == 0 && drumFlags[3]) { ClosedHiHat.play(); drumFlags[3] = false; } 
    else if (int(values[3]) == 1) drumFlags[3] = true;

    // ---------- Slide ----------
    float slider = float(values[4]);
    currentVolume = map(slider, 0, 1023, 0.0, 1.0);

    // ---------- Joystick ----------
    float joyX = float(values[5]);
    float joyY = float(values[6]);
    float deadzone = 100;

    if (abs(joyY - 512) > deadzone && voice1Flag && !voice1.isPlaying()) { voice1.play(); voice1Flag=false; }
    else if (abs(joyY - 512) <= deadzone) voice1Flag = true;

    if (abs(joyX - 512) > deadzone && voice2Flag && !voice2.isPlaying()) { voice2.play(); voice2Flag=false; }
    else if (abs(joyX - 512) <= deadzone) voice2Flag = true;

    // ---------- 入场音乐 & 背景音乐 ----------
    float pot = float(values[7]);

    if (slider < 10 && pot < 50) { // slide=0 && potentiometer=0
      if (!basicMusic.isPlaying()) {
        basicMusic.amp(currentVolume);
        basicMusic.play();
        amp.input(basicMusic);
      }
      // 确保背景音乐停止
      if (currentMusicIndex >= 0 && bgMusics[currentMusicIndex].isPlaying()) {
        bgMusics[currentMusicIndex].stop();
      }
    } else { // 非入场音乐情况
      if (basicMusic.isPlaying()) basicMusic.stop();

      if (pot >= 50) { // 切换背景音乐
        int newMusicIndex = 0;
        if (pot < 341) newMusicIndex = 0;
        else if (pot < 682) newMusicIndex = 1;
        else newMusicIndex = 2;

        if (newMusicIndex != currentMusicIndex) {
          if (currentMusicIndex >= 0) bgMusics[currentMusicIndex].stop();
          bgMusics[newMusicIndex].loop();
          bgMusics[newMusicIndex].amp(currentVolume);
          amp.input(bgMusics[newMusicIndex]);
          currentMusicIndex = newMusicIndex;
        } else {
          bgMusics[currentMusicIndex].amp(currentVolume);
        }
      }
    }

  } catch(Exception e) {
    println("Serial error:", e);
  }
}
