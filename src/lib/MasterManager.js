import { MasterTimer } from './MasterTimer.js';
import { Layer, TextLayer } from './Layer.js';
import { ImageLayer } from './Layer.js';
import { SceneManager } from './SceneManager.js';
import { SceneRenderer } from './SceneRenderer.js';
import { SceneTimer } from './SceneTimer.js';
import { Scene } from './Scene.js';
import { Keyframe, TextKeyframe } from './Keyframe.js';
import Vector2D from './Vector2D.js';
import { ProjectJsonParser } from './dataParser/JsonParser.js';
import { SoundManager } from './SoundManager.js';
import { MasterComponentManager } from './MasterComponentManager.js';

export class MasterManager {
  constructor(novelId) {
    this.novelId = novelId;

    //create timer
    this.masterTimer = new MasterTimer();
    this.sceneTimer = new SceneTimer();

    //canvas context
    this.frontContext = null;
    this.frontCanvas = null;

    //scene Manager
    this.sceneManager = new SceneManager();

    //
    this.soundManager = new SoundManager();

    //scene renderer
    this.sceneRenderer = new SceneRenderer();

    //test variable
    this.square_angle = 0;
    this.global_alpha_angle = 0;

    //target frames per second
    this.FPS = 60;

    this.canvasWidth = 800;
    this.canvasHeight = 600;

    this.mainLoop = this.mainLoop.bind(this);

    this.sceneManager.selectScene(0);

    //play상태 : 재생 상태
    //stop 상태 : scene 정지 상태
    this.playerStatus = 'play';

    this.UIComponentManager = new MasterComponentManager();
  }

  applySoundSystem() {
    if (this.sceneManager.sceneList.length === 0) return;

    const currentScene = this.sceneManager.getCurrentScene();
    const soundEvents = currentScene.soundList;
    const currentPlayTime = this.sceneTimer.getPlayTime();

    soundEvents.forEach((soundEvent) => {
      if (
        soundEvent.timeLabel <= currentPlayTime &&
        !soundEvent.isPlaying &&
        this.playerStatus === 'play'
      ) {
        soundEvent.audio.currentTime = currentPlayTime - soundEvent.timeLabel;
        soundEvent.play();
      }
    });
  }

  play() {
    this.playerStatus = 'play';
    // const currentScene = this.sceneManager.getCurrentScene();
    // currentScene.soundList.forEach(soundEvent => {
    //   if (!soundEvent.isPlaying) {
    //     soundEvent.resume();
    //   }
    // });
  }

  stop() {
    this.playerStatus = 'stop';
    this.sceneTimer.currentPlayTime = 0;
    const currentScene = this.sceneManager.getCurrentScene();
    currentScene.soundList.forEach((soundEvent) => {
      soundEvent.stop();
    });
  }

  pause() {
    this.playerStatus = 'pause';
    // const currentScene = this.sceneManager.getCurrentScene();
    // currentScene.soundList.forEach(soundEvent => {
    //   if (soundEvent.isPlaying) {
    //     soundEvent.pause();
    //   }
    // });
  }

  setCanvas(canvas) {
    this.frontCanvas = canvas;
    this.frontContext = canvas.getContext('2d');
    this.UIComponentManager.bindMouseEvents(canvas);
    this.UIComponentManager.bindKeyboardEvents(canvas);
  }

  /**
   *
   * Scene Play Time에 대한 정보를 로드한다.     *
   */
  updateSceneTimer() {
    //scene timer는 play, pause, stop이냐에 따라서 다르게 처리한다.
    if (this.playerStatus === 'play') {
      this.sceneTimer.updateTimer(this.masterTimer.getDeltaTime());
    }
    //else if master manager의 status가 stop
    //업데이트 하지 않는다.
  }

  clearScreen(targetCanvas) {
    let frontContext = targetCanvas.getContext('2d');
    frontContext.save();
    frontContext.globalAlpha = 1.0;
    frontContext.fillStyle = 'black';
    frontContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    frontContext.restore();
  }

  render() {
    this.clearScreen(this.frontCanvas);
    this.sceneRenderer.renderTargetScene(
      this.frontCanvas,
      this.sceneManager.getCurrentScene(),
      this.sceneTimer.getPlayTime(),
    );

    this.UIComponentManager.renderComponents(this.frontCanvas, this.frontContext);
  }

  isRenderable() {
    if (this.frontContext == null) return false;

    return true;
  }

  mainLoop() {
    setTimeout(() => {
      requestAnimationFrame(this.mainLoop);
    }, 1000 / this.FPS);

    if (!this.isRenderable()) return;

    this.masterTimer.updateTimer();

    this.updateSceneTimer();

    this.render();
    this.applySoundSystem();
  }
}
