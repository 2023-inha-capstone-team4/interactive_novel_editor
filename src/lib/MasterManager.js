import { MasterTimer } from './MasterTimer.js';
import {Layer, TextLayer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';
import { SceneRenderer } from './SceneRenderer.js';
import { SceneTimer } from './SceneTimer.js';
import { Scene } from './Scene.js';
import { Keyframe, TextKeyframe } from './Keyframe.js';
import Vector2D from './Vector2D.js';
import { SoundEvent } from './SoundEvent.js';
import { SoundPlayer } from './SoundPlayer.js';
import { AudioSound } from './AudioSound.js';


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

        //sound Player
        this.soundPlayer= new SoundPlayer();

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
        this.txtLayer.setText("사랑해");
        this.txtLayer.fontType="Arial";
        this.txtLayer.repeatType="reverse";
        this.txtLayer.name="사랑해";
        this.txtLayer.addKeyframe(new TextKeyframe(0,new Vector2D(400,300), new Vector2D(1,1), 0, 1, {red:255, green:255, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(0.75,new Vector2D(300,300), new Vector2D(3,3), 0, 0, {red:255, green:124, blue:0}));
        this.sceneManager.getCurrentScene().addLayer(this.txtLayer);

        this.txtLayer=new TextLayer();
        this.txtLayer.setText("안녕");
        this.txtLayer.fontType="Sans Serif";
        this.txtLayer.repeatType="none";
        this.txtLayer.name="안녕";
        this.txtLayer.addKeyframe(new TextKeyframe(0,new Vector2D(400,300), new Vector2D(1,1), 0, 1, {red:255, green:255, blue:255}));
        this.txtLayer.addKeyframe(new TextKeyframe(0.75,new Vector2D(800,300), new Vector2D(3,3), 0, 0, {red:255, green:124, blue:0}));
        this.sceneManager.getCurrentScene().addLayer(this.txtLayer);

        //scene 2번째 test code
        this.sceneManager.selectScene(1);
        this.imageLayer=new ImageLayer("https://item.kakaocdn.net/do/b0de2adb4008db8aec4d0616b9a04e0deffd194bae87d73dd00522794070855d");
        this.imageLayer.addKeyframe(new Keyframe(0,new Vector2D(400,300), new Vector2D(1,1),0,1));
        this.imageLayer.name="무지";
        this.sceneManager.getCurrentScene().addLayer(this.imageLayer);
        
        

                //scene 3번째 test code
                this.sceneManager.selectScene(2);
                this.imageLayer=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
                this.imageLayer.setRepeatType("none");
                this.imageLayer.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
                this.imageLayer.addKeyframe(new Keyframe(2,new Vector2D(300,300), new Vector2D(2,2),0,1));
                this.imageLayer.name="라이언2";
                this.sceneManager.getCurrentScene().addLayer(this.imageLayer);
                console.log(this.sceneManager.getCurrentScene());

                this.imageLayer2=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
                this.imageLayer2.repeatType=("none");
                this.imageLayer2.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
                this.imageLayer2.addKeyframe(new Keyframe(2,new Vector2D(600,300), new Vector2D(2,2),0,1));
                this.imageLayer2.name="라이언3";
                this.sceneManager.getCurrentScene().addLayer(this.imageLayer2);
                console.log(this.sceneManager.getCurrentScene());

                this.imageLayer3=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
                this.imageLayer3.repeatType="forward";
                this.imageLayer3.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
                this.imageLayer3.addKeyframe(new Keyframe(2,new Vector2D(600,500), new Vector2D(0.5,0.5),0,1));
                this.imageLayer3.name="라이언4";
                this.sceneManager.getCurrentScene().addLayer(this.imageLayer3);
                console.log(this.sceneManager.getCurrentScene());

                this.imageLayer4=new ImageLayer("https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785");
                this.imageLayer4.setRepeatType("reverse");
                this.imageLayer4.addKeyframe(new Keyframe(0,new Vector2D(500,300), new Vector2D(1,1),0,1));
                this.imageLayer4.addKeyframe(new Keyframe(2,new Vector2D(100,100), new Vector2D(1.5,1.5),0,1));
                this.imageLayer4.name="라이언5";
                this.sceneManager.getCurrentScene().addLayer(this.imageLayer4);
                console.log(this.sceneManager.getCurrentScene());
        
        console.log(this.sceneManager.sceneList);

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
        this.soundPlayer.stopAllSoundToTargetScene(this.sceneManager.getCurrentScene());
        
    }

    pause()
    {
        this.playerStatus="stop";
        this.soundPlayer.stopAllSoundToTargetScene(this.sceneManager.getCurrentScene());
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

    applySoundSystem()
    {

        this.soundPlayer.playSoundToTargetScene(this.sceneManager.getCurrentScene(),this.sceneTimer.getPlayTime());
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
        this.applySoundSystem();

    }


}