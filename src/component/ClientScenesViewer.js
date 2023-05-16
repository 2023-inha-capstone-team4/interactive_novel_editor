import { useRef, useEffect, useState } from "react";
import { SceneRenderer } from "../lib/SceneRenderer";
import { SceneTimer } from "../lib/SceneTimer";
import { MasterTimer } from "../lib/MasterTimer";


const ClientScenesViewer = ({ scenes }) => {
  const canvasRefs = useRef([]);

  const [sceneRenderer, setSceneRenderer] = useState(new SceneRenderer());
  const [sceneTimerList, setSceneTimerList] = useState([]);
  const [isRenderingList, setIsRenderingList] = useState([]);
  const [masterTimer, setMasterTimer] =useState(new MasterTimer());

  
  for(var i =0; i<scenes.length; i++)
  {
    sceneTimerList.push(new SceneTimer());
    isRenderingList.push(false);
  }

  const mainLoop = ()=>
  {
      setTimeout(() => {
          requestAnimationFrame(mainLoop);
      }, 1000/this.FPS);

      //if(!this.isRenderable()) return;
      masterTimer.updateTimer();
      updateTimers(masterTimer.getDeltaTime());

      renderScenes();
      applySoundSystem();
  }

  function updateTimers(deltaTime)
  {
    isRenderingList.forEach((isRendering, index)=>{

      if(isRendering)
      {
        sceneTimerList[index].updateTimer(deltaTime);
      }

    });
  }

  function renderScenes()
  {
    isRenderingList.forEach((isRendering, index)=>{

      if(isRendering)
      {
        sceneRenderer.clearScreen(canvasRefs.current[index]);
        sceneRenderer.renderTargetScene(canvasRefs.current[index], scenes[index], sceneTimerList[index].getPlayTime());
      }

    });
  }

  function applySoundSystem()
  {
    isRenderingList.forEach((isRendering, index)=>{

      if(isRendering)
      {
        let soundEvents=scenes[index].soundList;
        let currentPlayTime=sceneTimerList[index].getPlayTime();

        soundEvents.forEach(soundEvent => {
          if (soundEvent.timeLabel<=currentPlayTime && !soundEvent.isPlaying) {
            soundEvent.audio.currentTime=currentPlayTime-soundEvent.timeLabel;
            soundEvent.play();
          }
        });
      }

    });
  }


  useEffect(() => {

    mainLoop();

    const handleScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;

      canvasRefs.current.forEach((canvasRef, index) => {
        const { top, bottom } = canvasRef.getBoundingClientRect();

        // Check if the canvas is within the viewport
        if (top < clientHeight && bottom > 0) {
          // Render and play the scene data on the canvas
          isRenderingList[index]=true;
        } else {
          // Pause or stop the scene if needed
          isRenderingList[index]=false;
        }
      });
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scenes]);



  return (
    <div>
      {scenes.map((scene, index) => (
        <canvas
          key={index}
          ref={(ref) => (canvasRefs.current[index] = ref)}
          width={800}
          height={600}
        />
      ))}
    </div>
  );
};