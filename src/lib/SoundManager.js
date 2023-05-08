export class SoundManager {
  constructor(soundList) {
    this.soundList = soundList;
    this.isPlaying = false;
  }

  playSound(timeLabel) {
    // Find the sound event that should start playing at the specified time label.
    const soundEvent = this.soundList.find((sound) => sound.timeLabel === timeLabel);
    if (!soundEvent) {
      return;
    }

    // Create a new Audio object and play it.
    const audio = new Audio(soundEvent.soundPath);
    audio.play();

    // Set a timeout to stop the audio after its duration has passed.
    const duration = soundEvent.duration || audio.duration * 1000;
    setTimeout(() => {
      audio.pause();
    }, duration);
  }

  start(timeLabel) {
    // Set a flag to indicate that the sound system is playing.
    this.isPlaying = true;

    // Loop through all sound events and play them if they start at or after the specified time label.
    for (const soundEvent of this.soundList) {
      if (soundEvent.timeLabel >= timeLabel) {
        this.playSound(soundEvent.timeLabel);
      }
    }
  }

  stop() {
    // Set a flag to indicate that the sound system is no longer playing.
    this.isPlaying = false;
  }
}