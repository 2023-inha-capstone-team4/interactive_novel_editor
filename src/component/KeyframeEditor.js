import { useContext, useEffect, useRef, useState } from 'react';
import KeyframeBar from './KeyframeBar';
import styles from './KeyframeEditor.module.css';
import MenuBar from './menuBar';
import MenuItem from './menuItem';

import playButtonSrc from '../resources/images/buttons/play_icon.png';
import pauseButtonSrc from '../resources/images/buttons/pause_icon.png';
import stopButtonSrc from '../resources/images/buttons/stop_icon.png';
import { MasterManagerContext } from '../lib/MasterManagerContext';
import { KeyframeVerticalLine } from '../lib/KeyframeUI/KeyframeVerticalLine';
import { Keyframe } from '../lib/Keyframe';



function KeyframeEditor()
{

    //select mode, 
    const mode="select";

    const canvasRef=useRef(null);

    const FPS=30.0;
    const masterManager=useContext(MasterManagerContext);


    const canvasWidth=800;
    const canvasHeight=150;

    const numberingStartOffsetX=20;
    const numberingIntervalOffsetX=50;
    const numberCounts=15;
    const numberingEndOffsetX=numberingStartOffsetX+numberingIntervalOffsetX*(numberCounts-1);

    const horizontalLineStartOffsetX=20;
    const horizontalLineStartOffsetY=60;
    const horizontalLineLength=750;
    const horizontalLineThickness=1;
    const horizontalLineColumnAxisInterval=15;


    const KVline =new KeyframeVerticalLine();


    function isRenderable()
    {
        if(canvasRef!=null) return true;

        return false;
    }

    function render()
    {
        let ctx=canvasRef.current.getContext('2d');
        //render numberings 0~60
        renderTimeNumberings(ctx);

        //render 6 keyframe horizontal lines
        //representative, position, rotation, scale, image_fade_alpha, color
        renderKeyframeHorizontalLines(ctx);

        //render vertical time line
        renderKeyframeVerticalLine(ctx);

        //render keyframes sequentially
        renderKeyframes(ctx);

        //render horizontal scroll bar
        //render horizontal scroll bar button

    }

    function clearScreen()
    {
        let canvasContext =canvasRef.current.getContext("2d");
        canvasContext.save();
        canvasContext.globalAlpha=1.0;
        canvasContext.fillStyle="black";
        canvasContext.fillRect(0,0, canvasWidth, canvasHeight);
        canvasContext.restore();
    }

    function renderKeyframeHorizontalLines(canvasContext)
    {
        let numLines=6;

        for(var i=0; i<numLines; i++)
        {
            canvasContext.save();
            canvasContext.globalAlpha=1.0;
            canvasContext.fillStyle="white";
            canvasContext.fillRect(horizontalLineStartOffsetX,horizontalLineStartOffsetY+i*horizontalLineColumnAxisInterval, horizontalLineLength, horizontalLineThickness);
            canvasContext.restore();
        }
    }

    function renderKeyframeVerticalLine(canvasContext)
    {
        canvasContext.save();
        canvasContext.globalAlpha=1.0;
        canvasContext.fillStyle="red";

        let progressRate=1.0-(numberCounts-masterManager.sceneTimer.getPlayTime())/parseFloat(numberCounts);
        //KVline.focusTime=Math.min(numberCounts, masterManager.sceneTimer.getPlayTime());

        let vlineXOffset=Math.min(horizontalLineLength,horizontalLineLength*progressRate);

        canvasContext.fillRect(KVline.startXoffset+vlineXOffset,KVline.startYoffset, KVline.xLength, KVline.yLength);
        canvasContext.restore();
    }

    function mainLoop()
    {
        setTimeout(() => {
            requestAnimationFrame(mainLoop);
            
        }, 1000/FPS);

        if(!isRenderable()) return;

        clearScreen();
        render();

    }

    function renderText(text,context, fontSize,x,y, sizeScale, color)
    {

        context.save();
        //setFont
        context.font=fontSize+"px";
        context.fillStyle=`rgba(${color.red}, ${color.green}, ${color.blue}, 1)`;
        context.globalAlpha=1.0;
        context.fontWeight=900;

        context.translate(x, y);
        context.scale(sizeScale, sizeScale);
        context.rotate(0*Math.PI/180.0);

        let textWidth=context.measureText(text).width;
        let textHeight=fontSize;

        context.fillText(text,-textWidth/2, textHeight/2);
    
        context.restore();
    }

    function renderTimeNumberings(context)
    {
        for(var i=0; i<=numberCounts; i++)
        {
            renderText(String(i), context, 20, numberingStartOffsetX+i*numberingIntervalOffsetX, 30,1,{red:255, green:255,blue:255});
        }
    }

    function renderKeyframes(context)
    {
        //get Keyframe list
        if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

        let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
        let keyframes=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex].getKeyframes();

        
        for(var i=0; i<keyframes.length; i++)
        {
            let progressRate =1.0-(numberCounts-keyframes[i].timeLabel)/parseFloat(numberCounts);

            let keyframeXOffset= horizontalLineLength*progressRate;

            //render
            context.save();
            context.globalAlpha=1.0;
            context.beginPath();
            context.arc(horizontalLineStartOffsetX+keyframeXOffset, horizontalLineStartOffsetY, 5, 0, 2 * Math.PI);
            
            //if not hover, colored blue
            context.fillStyle = 'blue';

            //if hover, colored yellow

            //if selected, colored red
            context.fill();
            context.restore();

        }
    }

    useEffect(
        ()=>{

            mainLoop();


        }
        
    ,[]);



    return <>
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
    </>;
}



export default KeyframeEditor;