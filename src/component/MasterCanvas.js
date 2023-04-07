import { useContext, useEffect, useRef } from 'react';
import { MasterTimer } from '../lib/MasterTimer.js';
import {Layer}  from '../lib/Layer.js';
import {ImageLayer}  from '../lib/Layer.js';
import { SceneManager } from '../lib/SceneManager.js';
import { MasterManagerContext } from '../lib/MasterManagerContext.js';


function MasterCanvas()
{
        const frontCanvasRef=useRef(null);
        const masterManager=useContext(MasterManagerContext);


    useEffect(() => {
    
        var frontCanvas=frontCanvasRef.current;     

        masterManager.setCanvas(frontCanvas);
        masterManager.mainLoop();
    }, []);
    

    return (
        <>
            <canvas className='scene_canvas' ref={frontCanvasRef} width={masterManager.canvasWidth} height={masterManager.canvasHeight}></canvas>
        </>
        );
}


export default MasterCanvas;