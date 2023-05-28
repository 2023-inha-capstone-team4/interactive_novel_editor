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
import { Keyframe, TextKeyframe } from '../lib/Keyframe';
import Vector2D from '../lib/Vector2D';
import { CanvasButton } from '../lib/KeyframeUI/CanvasButton';
import { isEditable } from '@testing-library/user-event/dist/utils';
import Modal from './Modal';
import KeyframeModal from './modal_editors/KeyframeModal';



function KeyframeEditor()
{

    //select mode, 
    const mode="select";

    const canvasRef=useRef(null);

    /**
     * frame per second
     */
    const FPS=30.0;
    const masterManager=useContext(MasterManagerContext);


    const [canvasWidth, setCanvasWidth]=useState(window.innerWidth-20);
    const canvasHeight=150;

    /**
     * 키프레임 가로선 왼쪽 시작 오프셋 (x좌표)
     */
    const horizontalLineStartOffsetX=20;
    /**
     * 키프레임 가로선 왼쪽 시작 오프셋 (y좌표)
     */
    const horizontalLineStartOffsetY=60;
    /**
    * 키프레임 재생기 가로선 길이 (px)
    */
    const horizontalLineLength=1000;
    /**
     * 키프레임 재생기 가로선 두께 (px)
     */
    const horizontalLineThickness=1;
        /**
     * 키프레임 재생기 가로선 간격 (px)
     */
    const horizontalLineColumnAxisInterval=15;

    const numberingStartOffsetX=horizontalLineStartOffsetX;
    const numberCounts=15;
    const numberingIntervalOffsetX=horizontalLineLength/numberCounts;
    const numberingEndOffsetX=numberingStartOffsetX+numberingIntervalOffsetX*(numberCounts-1);

    


    const [keyframeEditModalOpened, setKeyframeEditModalOpen] = useState(false);
    const [keyframeDeleteModalOpened, setKeyframeDeleteModalOpen] = useState(false);

    //canvas button 당 event가 1회씩만 발생하도록 Debouncing 테크닉을 적용한다.
    let isDebouncing = false;

    let isKeyframeDragging=false;


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


    /**
     * 
     * @todo 시간이 겹치는 부분에 키프레임 생성시, 키프레임이 생성되지 않도록 수정해야 함 
     * 
     * 
     */
    function onClickAddKeyframe()
    {
        //get Keyframe list
        if(masterManager.sceneManager.getCurrentScene()==null) return;
        if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

        let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
        let currentLayer=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex];
        let keyframes=currentLayer.getKeyframes();

        //현재 상태가 pause 또는 stop이 아니면 (play 상태이면)
        //pause 상태로 설정한다.
        masterManager.pause();

        //현재 상태가 pause이고,
        //playTime이 가리키고 있는 곳에 keyframe이 없다면
        //디폴트 값 키프레임을 생성한다.
        let progressRate=1.0-(numberCounts-masterManager.sceneTimer.getPlayTime())/parseFloat(numberCounts);
        //default keyframe : position: masterManager canvas center, scale (1,1), rotation: zero, image_fade_alpha:1.0, 
        //textkeyframe일 때 color={red:128, green:128, blue: 128}
        if(currentLayer.layerType==="image")
        {
            currentLayer.addKeyframe(new Keyframe(masterManager.sceneTimer.getPlayTime(),new Vector2D(masterManager.frontCanvas.width/2, masterManager.frontCanvas.height/2), new Vector2D(1,1),0,1 ));
        }
        else if(currentLayer.layerType==="text")
        {
            console.log('add keyframe!');
            currentLayer.addKeyframe(new TextKeyframe(masterManager.sceneTimer.getPlayTime(), new Vector2D(masterManager.frontCanvas.width/2, masterManager.frontCanvas.height/2),new Vector2D(1,1),0,1,{red:128, green:128, blue:128}));
        }



        //현재 playTime이 0이 아니면
            //lastKeyframe.timeLabel보다 playTime 값이 클 때
            //lastKeyframe과 동일한 값을 갖는 keyframe을 생성한다.
            
            //어떤 두 키프레임의 사이에 playTime이 위치할 때는
            //두 키프레임을 linear interpolation 하는 값으로 키프레임을 생성한다.
    }

    function onClickDeleteKeyframe()
    {
        setKeyframeDeleteModalOpen(true);
        //정말로 선택한 키프레임을 삭제하시겠습니까? 창을 띄우고
        //예 또는 아니오 선택을 할 수 있도록한다.
        //예를 선택하면 => 해당 키프레임을 삭제한다.
        //아니오를 선택하면 => 모달창이 꺼진다.
    }

    function onClickEditKeyframe()
    {
        //선택된 키프레임이 없다면, 창을 출력하지 않는다.
        //현재 키프레임 값을 편집할 수 있는 모달 창을 출력한다.

                //get Keyframe list
        if(masterManager.sceneManager.getCurrentScene()==null) return;
        if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

        let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
        let currentLayer=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex];
        let keyframes=currentLayer.getKeyframes();

        keyframes.forEach((keyframe, index, array)=>
        {
            if(keyframe.isSelected)
            {
                setKeyframeEditModalOpen(true);
            }
        }
        );
    }



    const playButton=new CanvasButton(new Vector2D(300,10), 20, 20, 'https://static.vecteezy.com/system/resources/previews/010/151/781/non_2x/play-button-icon-sign-design-free-png.png', onClickPlay);
    const pauseButton=new CanvasButton(new Vector2D(300+90,10), 20, 20, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Eo_circle_red_pause.svg/2048px-Eo_circle_red_pause.svg.png',onClickPause);
    const stopButton=new CanvasButton(new Vector2D(300+180,10), 20, 20, 'https://cdn-icons-png.flaticon.com/512/4029/4029011.png',onClickStop);
    const addKeyframeButton=new CanvasButton(new Vector2D(40,10), 20, 20, 'https://pngimg.com/d/plus_PNG109.png',onClickAddKeyframe);
    const EditKeyframeButton=new CanvasButton(new Vector2D(100,10), 20, 20, 'https://iconsplace.com/wp-content/uploads/_icons/ff0000/256/png/edit-property-icon-14-256.png',onClickEditKeyframe);
    const deleteKeyframeButton=new CanvasButton(new Vector2D(160,10), 20, 20, 'https://cdn-icons-png.flaticon.com/512/3687/3687412.png',onClickDeleteKeyframe);
    const UIButtons=[playButton,pauseButton,stopButton, addKeyframeButton,EditKeyframeButton,deleteKeyframeButton];

    var textX=0;
    var textY=0;


    function isRenderable()
    {
        if(canvasRef!=null) return true;

        return false;
    }




    function isIntersectCircularBtn(centerPosition, radius, mouseX, mouseY)
    {
        let distanceFromCenter=Math.sqrt((centerPosition.x-mouseX)^2+(centerPosition.y-mouseY)^2);

        if(distanceFromCenter<=radius/2.0)
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
        if(masterManager.sceneManager.getCurrentScene()==null) return;
        if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

        let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
        let keyframes=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex].getKeyframes();

        //Render Representative keyframe clicker
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
            if(keyframes[i].isSelected)
            {
                context.fillStyle = 'pink';

            }
            else if(keyframes[i].isHover)
            {
                context.fillStyle = 'yellow';
            }
            else
            {
                context.fillStyle = 'blue';
            }
            context.fill();
            context.restore();
        }

        for(var i=0; i<keyframes.length; i++)
        {
            //첫번째 키프레임이거나, 이전 키프레임과 값이 동일하면
            //그레이 도트를 출력한다.
            //color값의 경우, 해당 color 값을 그대로 색상으로 하여 dot로 출력한다.
            let progressRate =1.0-(numberCounts-keyframes[i].timeLabel)/parseFloat(numberCounts);

            let keyframeXOffset= horizontalLineLength*progressRate;


            
            var prevKeyframe=null;
            var currentKeyframe=keyframes[i];

            if(keyframes.length>=2 && i>=1)
            {
                prevKeyframe=keyframes[i-1];
            }

            if(i===0)
            {
               for(var attr_idx=0; attr_idx<4 ; attr_idx++)
               {
                     //render
                context.save();
                context.globalAlpha=1.0;
                context.beginPath();
                context.arc(horizontalLineStartOffsetX+keyframeXOffset, horizontalLineStartOffsetY+horizontalLineColumnAxisInterval*(attr_idx+1), 5, 0, 2 * Math.PI);
                context.fillStyle = 'gray';
                context.fill();
                context.restore();
               }
            }
            else
            {
                   for(var attr_idx=0; attr_idx<4 ; attr_idx++)
                   {
                    var isValueEqual=false;

                    switch(attr_idx)
                    {
                        case 0:
                            if(Math.abs(prevKeyframe.position.x-currentKeyframe.position.x)<0.00001 && Math.abs(prevKeyframe.position.y-currentKeyframe.position.x)<0.00001)
                            {
                                isValueEqual=true;
                            }
                            else
                            {
                                isValueEqual=false;
                            }

                            break;

                        case 1:
                            if(Math.abs(prevKeyframe.scale.x-currentKeyframe.scale.x)<0.00001 && Math.abs(prevKeyframe.scale.y-currentKeyframe.scale.x)<0.00001)
                            {
                                isValueEqual=true;
                            }
                            else
                            {
                                isValueEqual=false;
                            }
                            break;

                        case 2:
                            if(Math.abs(prevKeyframe.rotation-currentKeyframe.rotation)<0.00001)
                            {
                                isValueEqual=true;
                            }
                            else
                            {
                                isValueEqual=false;
                            }
                            break;

                        case 3:
                            if(Math.abs(prevKeyframe.image_fade_alpha-currentKeyframe.image_fade_alpha)<0.00001)
                            {
                                isValueEqual=true;
                            }
                            else
                            {
                                isValueEqual=false;
                            }
                            break;

                        default:
                            break;
                    }


                         //render
                    context.save();
                    context.globalAlpha=1.0;
                    context.beginPath();
                    context.arc(horizontalLineStartOffsetX+keyframeXOffset, horizontalLineStartOffsetY+horizontalLineColumnAxisInterval*(attr_idx+1), 5, 0, 2 * Math.PI);
                    if(isValueEqual) //prevFrame의 attribute 값과 같다면, 그레이로 출력한다.
                    {
                        context.fillStyle = 'gray';
                    }
                    else //prevFrame의 attribute 값과 다르다면, 초록색으로 출력한다.
                    {
                        context.fillStyle='green';
                    }
                    context.fill();
                    context.restore();
                   }
            }


            //render keyframe text color
            if(masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex].layerType==="text")
            {
                let attr_idx=4;
                let r=currentKeyframe.color.red;
                let g=currentKeyframe.color.green;
                let b=currentKeyframe.color.blue;
                                  //render text color
                                  context.save();
                                  context.globalAlpha=1.0;
                                  context.beginPath();
                                  context.arc(horizontalLineStartOffsetX+keyframeXOffset, horizontalLineStartOffsetY+horizontalLineColumnAxisInterval*(attr_idx+1), 5, 0, 2 * Math.PI);
                                  context.fillStyle = `rgb(${r},${g},${b})`;
                                  context.fill();
                                  context.restore();
            }
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
                    const mouseX = (event.clientX - rect.left);
                    const mouseY = (event.clientY - rect.top);


                    //intersection 검출 UI Buttons
                    UIButtons.forEach((btn, index, array)=>{

                        if(isIntersectSquareRange(btn.position.x, btn.position.y, btn.xLength, btn.yLength,mouseX, mouseY))
                        {
                            btn.isHover=true;
                        }
                        else
                        {
                            btn.isHover=false;
                        }



                    });




                    //intersection 검출 keyframeverticalline
                    let progressRate=1.0-(numberCounts-masterManager.sceneTimer.getPlayTime())/parseFloat(numberCounts);
                    let vlineXOffset=Math.min(horizontalLineLength,horizontalLineLength*progressRate);
                    
                    let left=KVline.startXoffset+vlineXOffset-3;
                    let right=KVline.startXoffset+vlineXOffset+KVline.xLength+3;
                     let top=KVline.startYoffset;
                    let bottom=KVline.startYoffset+KVline.yLength;
                    
                    if(left<=mouseX && mouseX <=right && top<=mouseY && mouseY<=bottom)
                    {
                        KVline.isHover=true;
                        return;
                    }
                    else
                    {
                        KVline.isHover=false;
                    }


                    if(KVline.isMouseDragging)
                    {
                        masterManager.pause();

                        if(mouseX<=horizontalLineStartOffsetX-25)
                        {
                            masterManager.sceneTimer.setPlayTime(0);
                        }
                        else if(horizontalLineStartOffsetX+horizontalLineLength<=mouseX)
                        {
                            masterManager.sceneTimer.setPlayTime(numberCounts);
                        }
                        else
                        {
                            let progressRate=mouseX/parseFloat(horizontalLineStartOffsetX+ horizontalLineLength);
                            
                            masterManager.sceneTimer.setPlayTime(progressRate*numberCounts);
                        }

                    }
                    
                    //get Keyframe list
                    if(masterManager.sceneManager.getCurrentScene()==null) return;
                    if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

                    let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
                    let keyframes=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex].getKeyframes();

                    for(var i=0; i<keyframes.length; i++)
                    {
                        let keyframe=keyframes[i];

                        let progressRate =1.0-(numberCounts-keyframe.timeLabel)/parseFloat(numberCounts);

                        let keyframeXOffset= horizontalLineLength*progressRate;

                        let offsetX=horizontalLineStartOffsetX+keyframeXOffset;
                        let offsetY=horizontalLineStartOffsetY;

                        if(isIntersectSquareRange(offsetX-5.0,offsetY-5.0,10.0,10.0,mouseX, mouseY))
                        {
                            keyframe.isHover=true;
                        }
                        else
                        {
                            keyframe.isHover=false;
                        }


                        if(keyframes[i].isMouseDragging)
                        {
                            masterManager.pause();

                            if(mouseX<=horizontalLineStartOffsetX-25)
                            {
                                keyframes[i].timeLabel=0;
                            }
                            else if(horizontalLineStartOffsetX+horizontalLineLength<=mouseX)
                            {
                                keyframes[i].timeLabel=numberCounts;
                            }
                            else
                            {
                                let progressRate=mouseX/parseFloat(horizontalLineStartOffsetX+ horizontalLineLength);
                                
                                keyframes[i].timeLabel=(progressRate*numberCounts);
                            }

                            masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex].sortKeyframes();
                        }

                    }

                    
                  });
            
                  canvasRef.current.addEventListener('mouseup', () => {
                    KVline.isMouseDragging=false;

                    let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
                    let keyframes=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex].getKeyframes();
                    isKeyframeDragging=false;

                    for(var i=0; i<keyframes.length; i++)
                    {
                        keyframes[i].isMouseDragging=false;
                    }


                  });
            
            
                  canvasRef.current.addEventListener('mousedown', (e) => {

                    if (isDebouncing) return;
  
                    isDebouncing = true;
                    
                    setTimeout(() => {
                      isDebouncing = false;
                    }, 200); // Change the value depending on your needs

                    const rect = canvasRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    for(var i=0; i<UIButtons.length; i++)
                    {
                     let btn=UIButtons[i];
                     let isClicked=isIntersectSquareRange(btn.position.x, btn.position.y, btn.xLength,btn.yLength,mouseX, mouseY);
            
                        if(isClicked)
                        {
                            btn.onClick();
                            return;
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
                        KVline.isMouseDragging=true;
                        return;
                    }
                    else
                    {
                        
                    }

                    if(masterManager.sceneManager.getCurrentScene()===null) return;
                    if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

                    let keyframes=masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.currentLayerIndex].getKeyframes();
                    //intersection 검출 for each keyframe
                    for(var i=0; i<keyframes.length; i++)
                    {
                        let progressRate =1.0-(numberCounts-keyframes[i].timeLabel)/parseFloat(numberCounts);

                        let keyframeXOffset= horizontalLineLength*progressRate;

                        if(isIntersectSquareRange(horizontalLineStartOffsetX+keyframeXOffset-5.0, horizontalLineStartOffsetY-5.0,10,10,mouseX, mouseY) && !isKeyframeDragging)
                        {
                            keyframes[i].isSelected=true;
                            keyframes[i].isMouseDragging=true;
                            isKeyframeDragging=true;
                            return;
                        }
                        else
                        {
                            keyframes[i].isSelected=false;
                            keyframes[i].isMouseDragging=false;
                        }
                    }



                  
                  });
    }

    useEffect(() => {
        function handleResize() {
          setCanvasWidth(window.innerWidth-20);
        }
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    useEffect(
        ()=>{



            bindMouseEvents();
            mainLoop();


        }
        
    ,[]);

    function handleKeyframeChange(keyframe,index){
                
        let currentLayer=masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.currentLayerIndex];
        currentLayer.removeKeyframe(index);
        currentLayer.addKeyframe(keyframe);               
        
        setKeyframeEditModalOpen(false);
    }



    return <>
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className={styles.keyframe_editor_canvas}></canvas>
        {keyframeEditModalOpened?
            <KeyframeModal
            type={masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.currentLayerIndex].layerType}
            OnChangeKeyframe={handleKeyframeChange} 
            Keyframes={masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.currentLayerIndex].getKeyframes()} 
            OnCancelClick={()=>{setKeyframeEditModalOpen(false)}}/>
            :null
        }
        {keyframeDeleteModalOpened?
            <Modal>
                <div>정말로 해당 키프레임을 삭제하시겠습니까</div>
                
                <div>
                    <button onClick={()=>{

                                //get Keyframe list
                     if(masterManager.sceneManager.getCurrentScene()==null) return;
                     if(masterManager.sceneManager.getCurrentScene().layerList.length===0) return;

                        let currentLayerIndex= masterManager.sceneManager.currentLayerIndex;
                     let currentLayer=masterManager.sceneManager.getCurrentScene().layerList[currentLayerIndex];
                     let keyframes=currentLayer.getKeyframes();

                        keyframes.forEach((keyframe, index, value)=>{

                            if(keyframe.isSelected)
                            {
                                currentLayer.removeKeyframe(index);
                            }
                        });
                        
                        
                        setKeyframeDeleteModalOpen(false);}}>삭제</button>
                    <button onClick={()=>{setKeyframeDeleteModalOpen(false);}}>취소</button>
                </div>

            </Modal>
            :null
        }
    </>;
}



export default KeyframeEditor;