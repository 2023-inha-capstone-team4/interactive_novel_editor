export class SoundEvent {
    constructor(soundFilePath, startTime, repeatTimeInterval, repeatCount) {
        this.soundPath=soundFilePath;
        this.sound = new Audio(soundFilePath);
        this.startTime=startTime;
        this.repeatTimeInterval=repeatTimeInterval;
        this.repeatCount=repeatCount;
        this.isLoaded=false;
        this.isPlaying=false;

        this.sound.addEventListener('canplaythrough', function(){
            this.isLoaded=true;
            console.log('audio file completely loaded!');
            //this.sound.play();
            console.log(this.isLoaded);
            console.log(this.sound);
        });

        
    }
  
    play() {
      this.sound.play();
      this.isPlaying=true;
    }
  
    pause() {
      this.sound.pause();
      this.isPlaying=false;
    }
  
    setVolume(volume) {
      this.sound.volume = volume;
    }
  
    setCurrentTime(time) {

      this.sound.currentTime = time;
    }
  }