import { useContext, useEffect, useRef } from 'react';
import { MasterTimer } from './MasterTimer.js';
import {Layer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';
import { MasterManagerContext } from './MasterManagerContext.js';


function MasterCanvas(props)
{
        const frontCanvasRef=useRef(null);
        //create timer
        const masterManager=useContext(MasterManagerContext);

        console.log(masterManager);

    useEffect(() => {
    
        var frontCanvas=frontCanvasRef.current;        
        var frontContext=frontCanvas.getContext('2d');

        masterManager.setCanvasContext(frontContext);
        masterManager.mainLoop();
    }, []);
    

    return (
        <>
            <canvas className='scene_canvas' ref={frontCanvasRef} width={masterManager.canvasWidth} height={masterManager.canvasHeight}></canvas>
        </>
        );
}


export default MasterCanvas;