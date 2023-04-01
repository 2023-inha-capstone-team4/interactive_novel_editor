import { MasterTimer } from './MasterTimer.js';
import {Layer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';
import { SceneRenderer } from './SceneRenderer.js';
import { SceneTimer } from './SceneTimer.js';
import { Scene } from './Scene.js';
import { Keyframe } from './Keyframe.js';
import Vector2D from './Vector2D.js';


export class MasterManager
{
        constructor()
        {
        //create timer
        this.masterTimer = new MasterTimer();
        this.sceneTimer = new SceneTimer();

        //canvas context
        this.frontContext=null;
        this.frontCanvas=null;

        //scene Manager
        this.sceneManager=new SceneManager();

        //scene renderer
        this.sceneRenderer= new SceneRenderer();

        //test variable
        this.square_angle=0;
        this.global_alpha_angle=0;

        //target frames per second
        this.FPS=60;

        this.canvasWidth=800;
        this.canvasHeight=600;

        //layer test code
        this.myLayer=new ImageLayer('https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785');
        this.myLayer.setRepeatType("forward");

        //keyframe test code
        for(let i=0; i<11; i++)
        {
            let position=new Vector2D(this.canvasWidth/2+300*Math.cos(i*36*Math.PI/180.0),this.canvasHeight/2+300*Math.sin(i*36*Math.PI/180.0));
            let scale= new Vector2D(1.0-0.5*Math.cos(i*36.0*Math.PI/180.0),1.0-0.5*Math.cos(i*36.0*Math.PI/180.0));
            let rotation = 360*i;
            let fade_alpha=0.75 + 0.25*Math.cos(72*i*Math.PI/180.0);

            var newKeyframe=new Keyframe(parseFloat(i),position, scale,rotation, fade_alpha);

            this.myLayer.addKeyframe(newKeyframe);
        }

        this.sceneManager.getCurrentScene().addLayer(this.myLayer);

                //layer test code
                this.myLayer2=new ImageLayer('https://item.kakaocdn.net/do/b0de2adb4008db8aec4d0616b9a04e0deffd194bae87d73dd00522794070855d');
                this.myLayer2.setRepeatType("forward");
        
                //keyframe test code
                for(let i=0; i<11; i++)
                {
                    let position=new Vector2D(this.canvasWidth/2+300*Math.cos(-i*36*Math.PI/180.0),this.canvasHeight/2+300*Math.sin(-i*36*Math.PI/180.0));
                    let scale= new Vector2D(1.0-0.5*Math.cos(i*36.0*Math.PI/180.0),1.0-0.5*Math.cos(i*36.0*Math.PI/180.0));
                    let rotation = 360*i;
                    let fade_alpha=0.75 + 0.25*Math.cos(72*i*Math.PI/180.0);
        
                    var newKeyframe2=new Keyframe(parseFloat(i),position, scale,rotation, fade_alpha);
        
                    this.myLayer2.addKeyframe(newKeyframe2);
                }
        
                this.sceneManager.getCurrentScene().addLayer(this.myLayer2);


        this.mainLoop=this.mainLoop.bind(this);


        //play상태 : 재생 상태
        //stop 상태 : scene 정지 상태
        this.playerStatus="play";

        }
    
    play()
    {
        this.playerStatus="play";
    }

    stop()
    {
        this.playerStatus="stop";
        this.sceneTimer.stop();
    }

    pause()
    {
        this.playerStatus="stop";
    }

    



    setCanvas(canvas)
    {   
        this.frontCanvas=canvas;
        this.frontContext=canvas.getContext("2d");
    }

    /** 
     * 
     * Scene Play Time에 대한 정보를 로드한다.     * 
     */
    prepareRenderingData()
    {

        //scene timer는 play, pause, stop이냐에 따라서 다르게 처리한다.
        if(this.playerStatus==="play")
        {
            this.sceneTimer.updateTimer(this.masterTimer.getDeltaTime());
        }
        //else if master manager의 status가 stop
        //업데이트 하지 않는다.
    }

    clearScreen(targetCanvas)
    {
       let frontContext=targetCanvas.getContext("2d");
        frontContext.save();
        frontContext.globalAlpha=1.0;
        frontContext.fillStyle='black';
        frontContext.fillRect(0,0,this.canvasWidth, this.canvasHeight);
        frontContext.restore();
    }


    render()
    {
        this.clearScreen(this.frontCanvas);
        this.sceneRenderer.renderTargetScene(this.frontCanvas,this.sceneManager.getCurrentScene(), this.sceneTimer.getPlayTime());
    }


    isRenderable()
    {
        if(this.frontContext==null) return false;

        return true;
    }

    mainLoop()
    {
        setTimeout(() => {
            requestAnimationFrame(this.mainLoop);
        }, 1000/this.FPS);

        if(!this.isRenderable()) return;

        this.masterTimer.updateTimer();

        this.prepareRenderingData();

        this.render();

    }


}