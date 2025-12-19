import processing.sound.*;
import processing.serial.*;

SoundFile BassDrum;
SoundFile SnareDrum;
SoundFile HiHat;
SoundFile ClosedHiHat;
Serial connection;

boolean[] drumFlags = {true, true, true, true};

void setup(){
  size(600,200);
  
  BassDrum = new SoundFile(this, "BT0A0A7.WAV");
  SnareDrum = new SoundFile(this, "CSHD0.WAV");
  HiHat = new SoundFile(this, "HHCD0.WAV");
  ClosedHiHat = new SoundFile(this, "ST7T3S7.WAV");
  
  
  printArray(Serial.list());
  connection = new Serial( this, Serial.list()[0], 115200);
  connection.bufferUntil('\n');
  
}


void draw(){
  
}

void serialEvent(Serial conn){
  String incoming = conn.readString();
  String[] values = split(trim(incoming), ',');
  
  if( values.length == 4){
    if(float(values[0]) > 0){
      if(!SnareDrum.isPlaying() && drumFlags[0]){
        BassDrum.play();
        drumFlags[0] = false;
      }
    }
    else{
      drumFlags[0] = true;
    }
    
    if(float(values[1]) > 0){
      if(!SnareDrum.isPlaying() && drumFlags[1]){
          BassDrum.play();
          drumFlags[1] = false;
      }
    }
    else{
      drumFlags[1] = true;
    }
    
    if(float(values[2]) > 0){
      if(!HiHat.isPlaying() && drumFlags[2]){
         HiHat.play();
         drumFlags[2] = false;
      }
    }
    else{
      drumFlags[2] = true;
    }
    
    if(float(values[3]) > 0){
      if(!ClosedHiHat.isPlaying() && drumFlags[3]){
          ClosedHiHat.play();
          drumFlags[3] = false;
      }
    }
    else{
      drumFlags[3] = true;
    }
  }
}
