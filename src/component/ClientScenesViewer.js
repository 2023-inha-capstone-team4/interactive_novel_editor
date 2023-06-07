import { useRef, useEffect, useState } from 'react';
import { SceneRenderer } from '../lib/SceneRenderer';
import { SceneTimer } from '../lib/SceneTimer';
import { MasterTimer } from '../lib/MasterTimer';
import styles from './ClientScenesViewer.module.css';

const ClientScenesViewer = ({ scenes }) => {
  const canvasRefs = useRef([]);

  const [sceneRenderer, setSceneRenderer] = useState(new SceneRenderer());
  const [sceneTimerList, setSceneTimerList] = useState([]);
  const [isRenderingList, setIsRenderingList] = useState([]);
  const [masterTimer, setMasterTimer] = useState(new MasterTimer());

  const FPS = 60.0;

  for (var i = 0; i < scenes.length; i++) {
    sceneTimerList.push(new SceneTimer());
    isRenderingList.push(false);
  }

  const handleScroll = () => {
    const { scrollTop, clientHeight } = document.documentElement;

    canvasRefs.current.forEach((canvasRef, index) => {
      if (!canvasRef) return;
      const { top, bottom } = canvasRef.getBoundingClientRect();

      // Check if the canvas is within the viewport
      if (top < clientHeight && bottom > 0) {
        // Render and play the scene data on the canvas
        isRenderingList[index] = true;
      } else {
        // Pause or stop the scene if needed
        isRenderingList[index] = false;
      }
    });
  };

  const mainLoop = () => {
    setTimeout(() => {
      requestAnimationFrame(mainLoop);
    }, 1000 / FPS);

    //if(!this.isRenderable()) return;
    masterTimer.updateTimer();
    updateTimers(masterTimer.getDeltaTime());

    renderScenes();
    applySoundSystem();

    handleScroll();
  };

  function updateTimers(deltaTime) {
    isRenderingList.forEach((isRendering, index) => {
      if (isRendering) {
        sceneTimerList[index].updateTimer(deltaTime);
      }
    });
  }

  function renderScenes() {
    isRenderingList.forEach((isRendering, index) => {
      if (isRendering) {
        if (canvasRefs.current[index] === null) return;

        //Clear Screen
        let frontContext = canvasRefs.current[index].getContext('2d');
        let canvasWidth = canvasRefs.current[index].width;
        let canvasHeight = canvasRefs.current[index].height;
        frontContext.save();
        frontContext.globalAlpha = 1.0;
        frontContext.fillStyle = 'black';
        frontContext.fillRect(0, 0, canvasWidth, canvasHeight);
        frontContext.restore();
        //Render Screen
        sceneRenderer.renderTargetScene(
          canvasRefs.current[index],
          scenes[index],
          sceneTimerList[index].getPlayTime(),
        );
      }
    });
  }

  function applySoundSystem() {
    isRenderingList.forEach((isRendering, index) => {
      if (isRendering) {
        let soundEvents = scenes[index].soundList;
        let currentPlayTime = sceneTimerList[index].getPlayTime();

        soundEvents.forEach((soundEvent) => {
          if (soundEvent.timeLabel <= currentPlayTime && !soundEvent.isPlaying) {
            soundEvent.audio.currentTime = currentPlayTime - soundEvent.timeLabel;
            soundEvent.play();
          }
        });
      }
    });
  }

  useEffect(() => {
    mainLoop();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scenes]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {scenes.map((scene, index) => (
        <canvas
          key={index}
          ref={(ref) => (canvasRefs.current[index] = ref)}
          width={800}
          height={600}
          style={{ margin: 0, padding: 0 }}
        />
      ))}
    </div>
  );
};

export default ClientScenesViewer;
