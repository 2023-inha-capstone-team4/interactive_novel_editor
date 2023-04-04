export class AudioSound {
    constructor(url) {
      this.context = new AudioContext();
      this.buffer = null;
      this.url = url;
      this.isLoaded=false;
      this.isPlaying=false;
    }
  
    async load() {
      const response = await fetch(this.url);
      const audioData = await response.arrayBuffer();
      this.buffer = await this.context.decodeAudioData(audioData);

      this.isLoaded=true;
    }
  
    play() {
      const source = this.context.createBufferSource();
      source.buffer = this.buffer;
      source.connect(this.context.destination);
      source.start();

      this.isPlaying=true;
    }
  }