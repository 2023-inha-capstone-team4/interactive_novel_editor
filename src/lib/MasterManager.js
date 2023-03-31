import { MasterTimer } from './MasterTimer.js';
import {Layer}  from './Layer.js';
import {ImageLayer}  from './Layer.js';
import { SceneManager } from './SceneManager.js';


export class MasterManager
{
        constructor()
        {
        //create timer
        this.masterTimer = new MasterTimer();
        this.frontContext=null;

        //scene Manager
        this.sceneManger=new SceneManager();

        //test variable
        this.square_angle=0;
        this.global_alpha_angle=0;

        //target frames per second
        this.FPS=60;

        this.myLayer=new ImageLayer('https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb8618f324a0b9c48f77dbce3a43bd11ce785');

        this.canvasWidth=800;
        this.canvasHeight=600;

        this.mainLoop=this.mainLoop.bind(this);
        }

    setCanvasContext(canvasContext)
    {
        this.frontContext=canvasContext;
    }

    prepareRendering()
    {
        this.frontContext.save();
        this.frontContext.globalAlpha=1.0;
        this.frontContext.fillStyle='black';
        this.frontContext.fillRect(0,0,this.canvasWidth, this.canvasHeight);
        this.frontContext.restore();
    }


    updateScene(deltaTime)
    {
        this.square_angle+=180.0*deltaTime;
        this.global_alpha_angle+=10*deltaTime;

        this.square_angle%=360;
        this.global_alpha_angle%=360;
    }


    //Rotate 적용시 주의. 각도에 Math.PI/180 을 곱해야 실수로 변환됨.
    render(layer)
    {
        let image=layer.image;


        this.frontContext.save();


        this.frontContext.translate(this.canvasWidth/2, this.canvasHeight/2);
        //scale 구문
        this.frontContext.rotate(this.square_angle*Math.PI/180.0);
        this.frontContext.drawImage(image,-image.width/2,-image.height/2, image.width, image.height);
        
        this.frontContext.restore();
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

        this.prepareRendering();

        this.updateScene(this.masterTimer.getDeltaTime());
        this.render(this.myLayer);

    }


}