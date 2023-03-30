import { useEffect, useRef } from 'react';
import { MasterTimer } from './MasterTimer.js';
import {Layer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';


function MasterCanvas(props)
{
        //create timer
        const masterTimer = new MasterTimer();

        //create and load canvas
        var frontCanvasRef = useRef(null);
        var frontCanvas=null;
        var frontContext=null;

        //scene Manager
        let sceneManger=new SceneManager();


        var square_angle=0;
        var global_alpha_angle=0;

        //target frames per second
        const FPS=90;

        var myLayer=new ImageLayer('https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785');

        var canvasWidth=800;
        var canvasHeight=600;

        var currentScene=props.scene;

    function prepareRendering()
    {
        frontContext.save();
        frontContext.globalAlpha=1.0;
        frontContext.fillStyle='black';
        frontContext.fillRect(0,0,canvasWidth, canvasHeight);
        frontContext.restore();
    }


    function updateScene(deltaTime)
    {
        square_angle+=180.0*deltaTime;
        global_alpha_angle+=10*deltaTime;

        square_angle%=360;
        global_alpha_angle%=360;
    }


    //Rotate 적용시 주의. 각도에 Math.PI/180 을 곱해야 실수로 변환됨.
    function render(layer)
    {
        var image=layer.image;


        frontContext.save();


        frontContext.translate(canvasWidth/2, canvasHeight/2);
        frontContext.rotate(square_angle*Math.PI/180.0);
        frontContext.drawImage(image,-image.width/2,-image.height/2, image.width, image.height);
        
        frontContext.restore();
    }


    function isRenderable()
    {
        if(frontCanvas==null || frontContext==null) return false;

        return true;
    }

    function mainLoop()
    {
        setTimeout(() => {
            requestAnimationFrame(mainLoop);
        }, 1000/FPS);

        if(!isRenderable()) return;

        masterTimer.updateTimer();

        prepareRendering();

        updateScene(masterTimer.getDeltaTime());
        render(myLayer);

    }

    useEffect(() => {
    
        frontCanvas=frontCanvasRef.current;        
        frontContext=frontCanvas.getContext('2d');

        mainLoop();
    }, []);
    

    return (
        <>
            <div>
                <div>Scene Name</div>
                <div>Scene description</div>
            </div>
            <canvas className='scene_canvas' ref={frontCanvasRef} width={canvasWidth} height={canvasHeight}></canvas>
        </>
        );
}


export default MasterCanvas;