import processing.sound.*;

//from https://pages.mtu.edu/~suits/notefreqs.html
//                C4      C#4      D4      D#4    E4      F4      F#4      G4      G#4    A4      A#4     B4      C5
float[] notes = {261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.0, 466.16, 493.88, 523.25};

// Envelope parameters
Env env;

float attackTime = 0.001;
float sustainTime = 0.004;
float sustainLevel = 0.3;
float releaseTime = 2.4;

//Sine wave oscillator
SinOsc sineWave;
//Square wave oscillator
SqrOsc sqrWave;

//Low pass filter
LowPass lowPass;
float LPfreq=2500;

//For the visuals
ArrayList<PVector> points = new ArrayList<PVector>();

void setup(){
  size(600, 400);
  sineWave = new SinOsc(this);
  sqrWave = new SqrOsc(this);
  
  env  = new Env(this);
  
  lowPass = new LowPass(this);
  lowPass.process(sqrWave);
  
  
  colorMode(HSB, TWO_PI, 1, 1, 1);
}

void draw(){
  background(0, 0, 0);
  if(mousePressed){
    LPfreq = map(mouseY, 0, height, 5000, 100);
    points.add(new PVector(mouseX, mouseY));
  }
  lowPass.freq(LPfreq);
  
  for(PVector p : points){
    fill(map(p.y, 0, height, 0, TWO_PI), 0.8, 0.8);
    circle(p.x, p.y, 10);
  }
}

void keyReleased(){
  switch(key){
    case 'a': //C
      playNote(notes[0]);
      break;
    case 'w': //C#
      playNote(notes[1]);
      break;
    case 's': //D
      playNote(notes[2]);
      break;
    case 'e': //D#
      playNote(notes[3]);
      break;
    case 'd': //E
      playNote(notes[4]);
      break;
    case 'f': //F
      playNote(notes[5]);
      break;
    case 't': //F#
      playNote(notes[6]);
      break;
    case 'g': //G
      playNote(notes[7]);
      break;
    case 'y': //G#
      playNote(notes[8]);
      break;
    case 'h': //A
      playNote(notes[9]);
      break;
    case 'u': //A#
      playNote(notes[10]);
      break;
    case 'j': //B
      playNote(notes[11]);
      break;
    case 'k': //C
      playNote(notes[12]);
      break;
  }
}

//plays the same note on the sine and square wave oscillators
void playNote(float noteFreq) {
  sineWave.play(noteFreq, 0.75);
  env.play(sineWave, attackTime, sustainTime, sustainLevel, releaseTime);
  sqrWave.play(noteFreq, 0.75);
  env.play(sqrWave, attackTime, sustainTime, sustainLevel, releaseTime);
}
