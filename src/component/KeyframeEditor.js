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
import Vector2D from '../lib/Vector2D';
import { CanvasButton } from '../lib/KeyframeUI/CanvasButton';



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

    var isMouseDragging=false;


    const KVline =new KeyframeVerticalLine();

    function onClickPlay()
    {
        masterManager.play();
    }

    function onClickPause()
    {
        masterManager.pause();
    }

    function onClickStop()
    {
        masterManager.stop();
    }



    const playButton=new CanvasButton(new Vector2D(300,10), 20, 20, 'https://www.transparentpng.com/thumb/play-button/nHKpsQ-play-button-png.png', onClickPlay);
    const pauseButton=new CanvasButton(new Vector2D(300+90,10), 20, 20, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Eo_circle_red_pause.svg/2048px-Eo_circle_red_pause.svg.png',onClickPause);
    const stopButton=new CanvasButton(new Vector2D(300+180,10), 20, 20, 'https://cdn-icons-png.flaticon.com/512/4029/4029011.png',onClickStop);
    const UIButtons=[playButton,pauseButton,stopButton];

    var textX=0;
    var textY=0;


    function isRenderable()
    {
        if(canvasRef!=null) return true;

        return false;
    }


    function checkHover(mouseX, mouseY)
    {
        if(isMouseDragging) return;

    }

    function isIntersectCircularBtn(btn, mouseX, mouseY)
    {
        let distanceFromCenter=Math.sqrt((btn.position.x-mouseX)^2+(btn.position.y-mouseY)^2);

        if(distanceFromCenter<=btn.xLength/2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function isIntersectSquareRange(offsetX, offsetY, xLength,yLength, mouseX, mouseY)
    {
        let left=offsetX;
        let right=offsetX+xLength;
        let top=offsetY;
        let bottom=offsetY+yLength;

        if(left<=mouseX && mouseX<=right && top<=mouseY && mouseY<=bottom)
        {
            return true;
        }
        else
        {
            return false;
        }

    }


    function checkDragAndClick(mouseX, mouseY)
    {
        for(var i=0; i<UIButtons.length; i++)
        {
         let btn=UIButtons[i];
         let isClicked=isIntersectCircularBtn(btn,mouseX, mouseY);

            if(isClicked)
            {
                //btn.onClick();
                //console.log('click!');
            }
        }
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


        //render play buttons
        renderPlayButtons(ctx);
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

        if(KVline.isHover)
        {
            canvasContext.globalAlpha=0.5;
        }

        canvasContext.fillRect(KVline.startXoffset+vlineXOffset,KVline.startYoffset, KVline.xLength, KVline.yLength);
        canvasContext.restore();
    }

    function updateUI()
    {
        checkHover();
        checkDragAndClick();
    }

    function mainLoop()
    {
        setTimeout(() => {
            requestAnimationFrame(mainLoop);
            
        }, 1000/FPS);

        if(!isRenderable()) return;

        clearScreen();
        updateUI();
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

    function renderPlayButtons(context)
    {
        UIButtons.forEach(btn => {
            if(btn.isLoaded)
            {
                context.save();

                if(btn.isHover)
                    context.globalAlpha=0.6;
                context.fillStyle='red';
                //context.fillRect(btn.position.x, btn.position.y, btn.xLength, btn.yLength);
                context.drawImage(btn.image,btn.position.x, btn.position.y,btn.xLength,btn.yLength);
                context.restore();
            }
        });
    }

    function bindMouseEvents()
    {
        
                //process mouse event
                canvasRef.current.addEventListener('mousemove', function(event) {
                    const rect = canvasRef.current.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;

                                        //intersection 검출 keyframeverticalline
                                        let progressRate=1.0-(numberCounts-masterManager.sceneTimer.getPlayTime())/parseFloat(numberCounts);
                                        let vlineXOffset=Math.min(horizontalLineLength,horizontalLineLength*progressRate);
                    
                                        let left=KVline.startXoffset+vlineXOffset-3;
                                        let right=KVline.startXoffset+vlineXOffset+KVline.xLength+3;
                                        let top=KVline.startYoffset;
                                        let bottom=KVline.startYoffset+KVline.yLength;
                    
                                        if(left<=mouseX && mouseX <=right && top<=mouseY && mouseY<=bottom)
                                        {
                                            console.log('kv line HOVER!!');
                                            KVline.isHover=true;
                                        }
                                        else
                                        {
                                            KVline.isHover=false;
                                        }

                    
                  });
            
                  canvasRef.current.addEventListener('mouseup', () => {
                    isMouseDragging=false;
                  });
            
            
                  canvasRef.current.addEventListener('mousedown', (e) => {
                    const rect = canvasRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    for(var i=0; i<UIButtons.length; i++)
                    {
                     let btn=UIButtons[i];
                     let isClicked=isIntersectSquareRange(btn.position.x, btn.position.y, btn.xLength,btn.yLength,mouseX, mouseY);
                     console.log(`${btn.position.x} , ${btn.position.y}`);
            
                        if(isClicked)
                        {
                            console.log("click!");
                            btn.onClick();
                        }
                    }

                    //intersection 검출 keyframeverticalline
                    let progressRate=1.0-(numberCounts-masterManager.sceneTimer.getPlayTime())/parseFloat(numberCounts);
                    let vlineXOffset=Math.min(horizontalLineLength,horizontalLineLength*progressRate);

                    let left=KVline.startXoffset+vlineXOffset-3;
                    let right=KVline.startXoffset+vlineXOffset+KVline.xLength+3;
                    let top=KVline.startYoffset;
                    let bottom=KVline.startYoffset+KVline.yLength;

                    if(left<=mouseX && mouseX <=right && top<=mouseY && mouseY<=bottom)
                    {
                        console.log('kv line clicked!');
                        KVline.isMouseDragging=true;
                    }
                    else
                    {
                        
                    }


                  
                  });
    }

    useEffect(
        ()=>{



            bindMouseEvents();
            mainLoop();


        }
        
    ,[]);



    return <>
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
    </>;
}



export default KeyframeEditor;