import { ScrollEditor } from "./MasterUI/ScrollEditor";
import {CanvasButton} from "./KeyframeUI/CanvasButton";
import Vector2D from "./Vector2D";
import { useState } from "react";



export class MasterComponentManager
{

    constructor() {
        this.horizontalScrollEditor= new ScrollEditor("horizontal", new Vector2D(300+90, 10));

        this.verticalScrollEditor=new ScrollEditor("vertical", new Vector2D(10, 200+90));
        this.scrollEditorList=[this.horizontalScrollEditor, this.verticalScrollEditor];




        this.positionButton=new CanvasButton(new Vector2D(120,30), 20, 20, 'https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Right-512.png', this.onClickPosition);
        this.scaleButton=new CanvasButton(new Vector2D(120+90,30), 20, 20, 'https://cdn-icons-png.flaticon.com/512/3484/3484377.png',this.onClickScale);
        this.rotationButton=new CanvasButton(new Vector2D(120+180,30), 20, 20, 'https://cdn3.iconfinder.com/data/icons/flat-arrows-4/16/01_undo-rotate-left-512.png',this.onClickRotation);
        this.buttons=[this.positionButton,this.scaleButton,this.rotationButton];

        //현재 선택된 모드를 표시하는 버튼들. 클릭 처리를 하지 않음.
        this.positionImgButton=new CanvasButton(new Vector2D(20,10), 60, 60, 'https://static-00.iconduck.com/assets.00/move-icon-2048x2048-zzenwpkq.png', null);
        this.scaleImgButton=new CanvasButton(new Vector2D(20,10), 60, 60, 'https://cdn-icons-png.flaticon.com/512/3484/3484377.png', null);
        this.rotationImgButton=new CanvasButton(new Vector2D(20,10), 60, 60, 'https://cdn3.iconfinder.com/data/icons/flat-arrows-4/16/01_undo-rotate-left-512.png', null);
        this.modeButtons={"position":this.positionImgButton,"scale":this.scaleImgButton,"rotation":this.rotationImgButton};


        this.isDebouncing=false;
        this.mode="position";

        this.onClickPosition = this.onClickPosition.bind(this);
        this.onClickScale = this.onClickScale.bind(this);
        this.onClickRotation = this.onClickRotation.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.selectedLayer=null;
        this.setSelectedLayer = this.setSelectedLayer.bind(this);

        this.dragStartMouseX=0;
        this.dragStartMouseY=0;
    }

    setSelectedLayer = (layer) =>
    {
        console.log(layer+ 'selected!');
        this.selectedLayer=layer;
    }

    isIntersectSquareRange(offsetX, offsetY, xLength,yLength, mouseX, mouseY)
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

    onClickPosition= () =>
    {
        this.mode="position";
    }

    onClickScale = () =>
    {
        this.mode="scale";
    }

    onClickRotation =() =>
    {
        this.mode="rotation";
    }


    bindMouseEvents(canvas)
    {
        
                //process mouse event
                canvas.addEventListener('mousemove', (event)=> {
                    const rect = canvas.getBoundingClientRect();
                    const mouseX = (event.clientX - rect.left);
                    const mouseY = (event.clientY - rect.top);



                    for(var i=0; i<this.buttons.length; i++)
                    {
                     let btn=this.buttons[i];
                     let isHover=this.isIntersectSquareRange(btn.position.x, btn.position.y, btn.xLength,btn.yLength,mouseX, mouseY);
            
                        if(isHover)
                        {
                            btn.isHover=true;
                            return;
                        }
                        else
                        {
                            btn.isHover=false;
                        }
                    }


                    this.scrollEditorList.forEach((scroller)=>{
                        let isHover=this.isIntersectSquareRange(scroller.position.x, scroller.position.y, scroller.buttonSize, scroller.buttonSize, mouseX, mouseY)

                        if(isHover)
                        {
                            scroller.isHover=true;
                        }
                        else
                        {
                            scroller.isHover=false;
                        }
                    });

                
                    this.scrollEditorList.forEach((scroller)=>{

                        if(scroller.isMouseDragging && this.selectedLayer!==null)
                        {
                            this.selectedLayer.getKeyframes().forEach((keyframe)=>{
    
                                if(keyframe.isSelected)
                                {
                                    switch(this.mode)
                                    {
                                        case "position":
                                            this.applyDragPosition(canvas,scroller.type,keyframe,mouseX, mouseY);
                                            break;
                                        case "scale":
                                            this.applyDragScale(canvas, scroller.type,keyframe,mouseX, mouseY);
                                            break;
                                        case "rotation":
                                            this.applyDragRotation(canvas, scroller.type,keyframe,mouseX, mouseY);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            })
                        }


                    }
                    );
                    
                });


                            
                canvas.addEventListener('mouseup', () => {
                    
                    this.scrollEditorList.forEach((scroller)=>{
                        scroller.isMouseDragging=false;
                    });
                    
                  });
            
            
                  canvas.addEventListener('mousedown', (e) => {


                    const rect = canvas.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    for(var i=0; i<this.buttons.length; i++)
                    {
                     let btn=this.buttons[i];
                     let isClicked=this.isIntersectSquareRange(btn.position.x, btn.position.y, btn.xLength,btn.yLength,mouseX, mouseY);
            
                        if(isClicked)
                        {
                            btn.onClick();
                            return;
                        }
                    }


                // //scroll editor drag 검증 로직.
                // let canvasWidth=canvas.width;
                // let canvasHeight=canvas.height;
                // let horizontalValue=this.horizontalScrollEditor.value;
                // let verticalValue=this.verticalScrollEditor.value;

                // let horizontalAxis=canvasWidth*horizontalValue;
                // let verticalAxis=canvasHeight*verticalValue;


                // //vertical editor 검증
                // if(this.mode!=="rotation" && this.isIntersectSquareRange(this.scrollEditorXPadding, this.scrollEditorYPadding+verticalAxis,this.verticalScrollEditor.buttonSize,this.verticalScrollEditor.buttonSize,mouseX,mouseY))
                // {
                //     this.verticalScrollEditor.isMouseDragging=true;
                // }
                


                // //horizontal editor 검증
                // if(this.isIntersectSquareRange(this.scrollEditorXPadding+horizontalAxis, this.scrollEditorYPadding,this.horizontalScrollEditor.buttonSize,this.horizontalScrollEditor.buttonSize,mouseX,mouseY))
                // {
                //     this.horizontalScrollEditor.isMouseDragging=true;
                // }
                
                this.scrollEditorList.forEach((scroller)=>{
                    if(this.isIntersectSquareRange(scroller.position.x, scroller.position.y, scroller.buttonSize,scroller.buttonSize, mouseX, mouseY))
                    {
                        scroller.isMouseDragging=true;
                        this.dragStartMouseX=mouseX;
                        this.dragStartMouseY=mouseY;
                    }

                });
     });
    }

    applyDragPosition(canvas,scrollerType, keyframe, mouseX, mouseY)
    {
        var delta=0;
        switch(scrollerType)
        {
            case "horizontal":
                delta=mouseX-this.dragStartMouseX;
                this.dragStartMouseX=mouseX;
                keyframe.position.x+=delta;
            break;
            case "vertical":
                delta=mouseY-this.dragStartMouseY;
                this.dragStartMouseY=mouseY;
                keyframe.position.y+=delta;
                break;
            default:
                break;
        }
    }

    applyDragScale(canvas,scrollerType, keyframe, mouseX, mouseY)
    {
        var delta=0;
        switch(scrollerType)
        {
            case "horizontal":
                delta=(mouseX-this.dragStartMouseX)/canvas.height;
                this.dragStartMouseX=mouseX;
                keyframe.scale.x+=delta;
            break;
            case "vertical":
                delta=(mouseY-this.dragStartMouseY)/canvas.height;
                this.dragStartMouseY=mouseY;
                keyframe.scale.y+=delta;
                break;
            default:
                break;
        }
    }

    applyDragRotation(canvas,scrollerType, keyframe, mouseX, mouseY)
    {
        var delta=0;
        switch(scrollerType)
        {
            case "horizontal":
                delta=((mouseX-this.dragStartMouseX)/canvas.width)*360;
                this.dragStartMouseX=mouseX;
                keyframe.rotation+=delta;
            break;
            case "vertical":
                break;
            default:
                break;
        }
    }


    /**
     * Q,W,E 단축키로 position, scale, rotation 편집모드를 각각 선택할 수 있도록 한다.
     * 
     */
    bindKeyboardEvents(canvas)
    {

        canvas.setAttribute("tabindex", 0);
        canvas.focus();

        canvas.addEventListener("keydown", this.handleKeyDown);
    }

    
    handleKeyDown = (event) => {
        switch (event.key) {
          case "q":
            this.mode="position";
            break;
          case "w":
            this.mode="scale";
            break;
          case "e":
            this.mode="rotation";
            break;
          default:
            this.mode=null;
            //console.log("Key pressed: " + event.key);
            break;
        }
    }


    renderButtons(context)
    {
        this.buttons.forEach(btn => {
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

        context.save();
            switch(this.mode)
            {
                case "position":
                    context.drawImage(this.positionImgButton.image,this.positionImgButton.position.x, this.positionImgButton.position.y,this.positionImgButton.xLength,this.positionImgButton.yLength);
                break;
                case "scale":
                    context.drawImage(this.scaleImgButton.image,this.positionImgButton.position.x, this.positionImgButton.position.y,this.positionImgButton.xLength,this.positionImgButton.yLength);
                break;
                default:
                    context.drawImage(this.rotationImgButton.image,this.positionImgButton.position.x, this.positionImgButton.position.y,this.positionImgButton.xLength,this.positionImgButton.yLength);
                    break;
                }

        context.restore();
    }


    renderScrollEditors(canvas, context)
    {
                //scroll editor drag 검증 로직.
                // let canvasWidth=canvas.width;
                // let canvasHeight=canvas.height;
                // let horizontalValue=this.horizontalScrollEditor.value;
                // let verticalValue=this.verticalScrollEditor.value;

                // let horizontalAxis=canvasWidth*horizontalValue;
                // let verticalAxis=canvasHeight*verticalValue;

        //rotation일 경우, vertical editor를 렌더링하지 않음.
            //render
        this.scrollEditorList.forEach((scroller)=>{

                context.save();
                context.globalAlpha=1.0;
                context.beginPath();
                context.arc(scroller.position.x+scroller.buttonSize/2,scroller.position.y+scroller.buttonSize/2 , scroller.buttonSize/2, 0, 2 * Math.PI);
                
                //if not hover, colored blue
                if(scroller.isHover)
                {
                    context.fillStyle = 'pink';

                }
                else
                {
                    context.fillStyle = 'blue';
                }

                if(scroller.isMouseDragging)
                {
                    context.fillStyle='yellow';
                }



                
                    context.fill();

                context.restore();
        
        });
    }
    


    renderComponents(canvasRef, context)
    {
        this.renderButtons(context);

        this.renderScrollEditors(canvasRef, context);
    }


}