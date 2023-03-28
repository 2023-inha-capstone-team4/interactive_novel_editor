import { useEffect, useLayoutEffect, useRef } from "react";
import MasterTimer from "./lib/MasterTimer";
import './Portfolio.css';


function Portfolio()
{
    const masterTimer=new MasterTimer();

    var isFront_BackStage=true;

    const frontBufferCanvasRef=useRef(null);
    var frontBufferCanvas=null;
    var frontBufferContext=null;

    const backBufferCanvasRef=useRef(null);
    var backBufferCanvas=null;
    var backBufferContext=null;

    var canvasWidth=800;
    var canvasHeight=600;

    const TARGET_FRAME_RATE= 30;
    const TIMER_PER_FRAME=1000/TARGET_FRAME_RATE;


    function isRenderable()
    {
        if(frontBufferContext==null || frontBufferCanvas==null || backBufferContext==null || backBufferCanvas==null
            )
        {
            return false;
        }

        return true;
    }

    function getCurrentBackstageContext()
    {
        if(isFront_BackStage)
        {
            return frontBufferContext;
        }
        else
        {
            return backBufferContext;
        }
    }

    function swapBackstageContext()
    {
        if(isFront_BackStage)
        {
            frontBufferCanvas.style.display='block';
            backBufferCanvas.style.display='none';
        }
        else
        {
            frontBufferCanvas.style.display='none';
            backBufferCanvas.style.display='block';
        }

        //toggle rendering buffer
        isFront_BackStage=!isFront_BackStage;
    }


    function loop()
    {

        const deltaTime=masterTimer.getDeltaTime();

        const TIME_TO_WAIT=TIMER_PER_FRAME-deltaTime;

        setTimeout(() => {
            
            masterTimer.updateTimer();

            if(isRenderable())
            {
                const currentBackCountext=getCurrentBackstageContext();
                prepareRendering(currentBackCountext);

                //render to back buffer
                render(currentBackCountext,'https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb861f604e7b0e6900f9ac53a43965300eb9a');

                //swap buffer
                swapBackstageContext();
            }

            loop();
            console.log(TIME_TO_WAIT);
        }, TIME_TO_WAIT);
    }

    function prepareRendering(ctx)
    {
            // Clear the canvas
            clearScreen(ctx);
    }

    function render(ctx, image_path)
    {
        var image=new Image();
        image.src=image_path;

        image.onload = () =>{
            ctx.save();
            ctx.drawImage(image, 0,0);
            ctx.restore();
        };
    }


    function clearScreen(ctx)
    {
        ctx.save();
        ctx.clearRect(0,0, canvasWidth, canvasHeight);
        ctx.restore();
        
    }


    useEffect(() => {
        frontBufferCanvas=frontBufferCanvasRef.current;        
        frontBufferContext=frontBufferCanvas.getContext('2d');
        
        backBufferCanvas=backBufferCanvasRef.current;        
        backBufferContext=backBufferCanvas.getContext('2d');


        loop();
        
      return () => {
      }
    }, []);
    







    return (<div className='portfolio_content'>
            <canvas className='scene_canvas' ref={frontBufferCanvasRef} width={canvasWidth} height={canvasHeight}></canvas>
            <canvas className='scene_canvas' ref={backBufferCanvasRef} width={canvasWidth} height={canvasHeight} style={{display:'none'}}>
            </canvas>
        </div>);
}


export default Portfolio;