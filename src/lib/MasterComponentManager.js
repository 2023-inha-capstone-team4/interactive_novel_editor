import { ScrollEditor } from "./MasterUI/ScrollEditor";
import {CanvasButton} from "./KeyframeUI/CanvasButton";
import Vector2D from "./Vector2D";



export class MasterComponentManager
{

    constructor() {
        this.horizontalScrollEditorLeft= new ScrollEditor("horizontal", new Vector2D(300, 10));
        this.horizontalScrollEditorRight= new ScrollEditor("horizontal", new Vector2D(300+180, 10));

        this.verticalScrollEditorUp=new ScrollEditor("vertical", new Vector2D(10, 200));
        this.verticalScrollEditorDown=new ScrollEditor("vertical",new Vector2D(10, 200+180));
        this.scrollEditorList=[this.horizontalScrollEditorLeft, this.horizontalScrollEditorRight, this.verticalScrollEditorUp, this.verticalScrollEditorDown];




        this.positionButton=new CanvasButton(new Vector2D(300,40), 20, 20, 'https://cdn0.iconfinder.com/data/icons/flat-round-arrow-arrow-head/512/Red_Arrow_Right-512.png', this.onClickPosition);
        this.scaleButton=new CanvasButton(new Vector2D(300+90,40), 20, 20, 'https://cdn-icons-png.flaticon.com/512/3484/3484377.png',this.onClickScale);
        this.rotationButton=new CanvasButton(new Vector2D(300+180,40), 20, 20, 'https://cdn3.iconfinder.com/data/icons/flat-arrows-4/16/01_undo-rotate-left-512.png',this.onClickRotation);
        this.buttons=[this.positionButton,this.scaleButton,this.rotationButton];

        //현재 선택된 모드를 표시하는 버튼들. 클릭 처리를 하지 않음.
        this.positionImgButton=new CanvasButton(new Vector2D(100,10), 20, 20, 'https://static-00.iconduck.com/assets.00/move-icon-2048x2048-zzenwpkq.png', null);
        this.scaleImgButton=new CanvasButton(new Vector2D(100,10), 20, 20, 'https://cdn-icons-png.flaticon.com/512/3484/3484377.png', null);
        this.rotationImgButton=new CanvasButton(new Vector2D(100,10), 20, 20, 'https://cdn3.iconfinder.com/data/icons/flat-arrows-4/16/01_undo-rotate-left-512.png', null);
        this.modeButtons={"position":this.positionImgButton,"scale":this.scaleImgButton,"rotation":this.rotationImgButton};

        //position, scale, rotation 모드를 선택할 수 있으며, 각 모드에 따라 scroll bar 편집 기능을 지원함.
        this.mode="position";

        this.isDebouncing=false;
    
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

    onClickPosition()
    {
        this.mode="position";
    }

    onClickScale()
    {
        this.mode="scale";
    }

    onClickRotation()
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
                });


                            
                canvas.addEventListener('mouseup', () => {
                    
                    this.scrollEditorList.forEach((scroller)=>{
                        scroller.isMouseDragging=false;
                    });
                    
                  });
            
            
                  canvas.addEventListener('mousedown', (e) => {

                    if (this.isDebouncing) return;
  
                    this.isDebouncing = true;
                    
                    setTimeout(() => {
                      this.isDebouncing = false;
                    }, 200); // Change the value depending on your needs

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
                    }

                });

     });



    }


    /**
     * Q,W,E 단축키로 position, scale, rotation 편집모드를 각각 선택할 수 있도록 한다.
     * 
     */
    bindKeyboardEvents(canvas)
    {

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