import { MasterTimer } from './MasterTimer.js';
import {Layer, TextLayer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';
import { SceneRenderer } from './SceneRenderer.js';
import { SceneTimer } from './SceneTimer.js';
import { Scene } from './Scene.js';
import { Keyframe, TextKeyframe } from './Keyframe.js';
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


        this.mainLoop=this.mainLoop.bind(this);


        //text layer test code
        this.txtLayer=new TextLayer();
        this.txtLayer.setText("인터랙티브 노벨에 오신걸 환영합니다!");
        this.txtLayer.fontType="Nanum Square";
        this.txtLayer.repeatType="forward";
        this.txtLayer.addKeyframe(new TextKeyframe(0,new Vector2D(400,300), new Vector2D(1,1), 0, 1, {red:0, green:255, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(1,new Vector2D(400,300), new Vector2D(1.5,1.5), 360, 1, {red:0, green:0, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(2,new Vector2D(400,300), new Vector2D(1,1), 720, 1, {red:255, green:0, blue:255}));
        this.sceneManager.getCurrentScene().addLayer(this.txtLayer);


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
        frontContext.fillStyle="black";
        frontContext.fillRect(0,0, this.canvasWidth, this.canvasHeight);
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