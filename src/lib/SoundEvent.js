

export class SoundEvent {
    constructor(timeLabel, soundPath, duration = null) {
      this.name="new sound";
      this.timeLabel = timeLabel;
      this.soundPath = soundPath;
      this.duration = duration;
      this.audio=new Audio(soundPath);
      this.isPlaying=false;
    }


    play()
    {
      this.isPlaying=true;
      this.audio.play();
    }

    pause() {
      this.audio.pause();
      this.isPlaying = false;
    }
    
    resume() {
      this.audio.play().catch(error => {
        // handle error
        console.error("Error playing audio:", error);
      });
      this.isPlaying = true;
    }
    
    stop() {
      this.audio.pause();
      this.audio.currentTime = 0; // reset to start
      this.isPlaying = false;
    }
    
    reset() {
      this.audio.currentTime = 0; // reset to start
    }
  }