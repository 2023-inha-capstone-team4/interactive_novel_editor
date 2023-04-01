import { useContext, useEffect, useRef } from 'react';
import { MasterTimer } from './MasterTimer.js';
import {Layer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';
import { MasterManagerContext } from './MasterManagerContext.js';


function MasterCanvas()
{
        const frontCanvasRef=useRef(null);
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