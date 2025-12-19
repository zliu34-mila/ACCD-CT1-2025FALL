#define BTN1 27
#define BTN2 21
#define BTN3 13
#define BTN4 12

#define SLIDE A0
#define JOY_X A1
#define JOY_Y A2
#define MUSIC_SELECT A3  // 新增旋钮

void setup() {
  Serial.begin(115200);

  pinMode(BTN1, INPUT_PULLUP);
  pinMode(BTN2, INPUT_PULLUP);
  pinMode(BTN3, INPUT_PULLUP);
  pinMode(BTN4, INPUT_PULLUP);
}

void loop() {
  int b1 = digitalRead(BTN1);
  int b2 = digitalRead(BTN2);
  int b3 = digitalRead(BTN3);
  int b4 = digitalRead(BTN4);

  int slider = analogRead(SLIDE);
  int joyX = analogRead(JOY_X);
  int joyY = analogRead(JOY_Y);

  int musicPot = analogRead(MUSIC_SELECT); // 新增旋钮值

  // 发送数据：4个按钮 + Slide + Joystick X/Y + Music选择
  Serial.print(b1); Serial.print(',');
  Serial.print(b2); Serial.print(',');
  Serial.print(b3); Serial.print(',');
  Serial.print(b4); Serial.print(',');
  Serial.print(slider); Serial.print(',');
  Serial.print(joyX); Serial.print(',');
  Serial.print(joyY); Serial.print(',');
  Serial.println(musicPot);

  delay(100); // 100Hz
}
