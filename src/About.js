import { useEffect, useRef } from "react";
import Vector2D from "./lib/Vector2D";

class ImageObject{

    //.jpg, .bmp, .png 등 이미지 path가 아니면 로딩이 안되도록 예외처리 해야함
    constructor(image_path)
    {
        this.image_path = image_path;
        this.image=new Image();
        this.position=new Vector2D(0,0);
        this.scale=new Vector2D(1,1);
        this.rotation=0;
        this.isLoaded=false;
    }

}

function About()
{
    const canvasRef=useRef(null);
    var canvas=null;
    var context=null;

    var image_obj=new ImageObject('./resources/images/universe.jpg');

    var canvasWidth=800;
    var canvasHeight=600;

    function isRenderable()
    {
                //if null, no rendering
                if(canvas==null || context==null)
                {
                    return false;
                }

                return true;
    }

    function clearScreen()
    {
        context.fillStyle='#000000';
        context.fillRect(0,0, canvasWidth, canvasHeight);
        context.restore();
    }

    function setCenteredPivotPoint(image_object)
    {
        const image_width=image_object.image.width*image_object.image.scale.x;
        const image_height=image_object.image.height*image_object.image.scale.y;

        context.translate(-image_width/2, -image_height/2);
    }

    function processImageTransformation(image_object)
    {
        context.translate(image_object.position.x, image_object.position.y);
        context.rotate(image_object.rotation * Math.PI/180);
    }

    //load images and prepare rendering
    async function prepareRendering() {
        image_obj.image.src = await import('./resources/images/universe.jpg');
      
        return new Promise((resolve, reject) => {
          image_obj.image.onload = () => {
            image_obj.isLoaded = true;
            resolve();
          };
          image_obj.image.onerror = (error) => {
            reject(error);
          };
        });
      }

    function renderLayerImageObject(image_object)
    {
            context.save();
            //setCenteredPivotPoint(image_object);
            //processImageTransformation(image_object);
    
            console.log('sss');
    
            //get image width, height to render image
            //const imageRenderingWidth= image_object.image.width * image_object.scale.x;
            //const imageRenderingHeight= image_object.image.height * image_object.scale.y;
    
            const img=new Image();
            img.src=require('./resources/images/universe.jpg');

            //draw image
            context.drawImage(img,0,0, 100, 100);
    
            context.restore();
    }

    async function render()
    {
        //if null, no rendering
        if(!isRenderable())
        {
            return;
        }

        await prepareRendering();
        //set color
        clearScreen();

        context.save();

        if(image_obj.isLoaded)
        {
            setCenteredPivotPoint(image_obj);
            processImageTransformation(image_obj);
            //get image width, height to render image
        const imageRenderingWidth= image_obj.image.width * image_obj.scale.x;
        const imageRenderingHeight= image_obj.image.height * image_obj.scale.y;
    
            //draw image
            context.drawImage(image_obj.image,0,0, imageRenderingWidth, imageRenderingHeight);
        
        }

        context.restore();

    }

    useEffect(()=>{
            canvas=canvasRef.current;
            context=canvas.getContext('2d');


        render(context);

    }, [render]);
    

    return (<canvas id="scene_canvas" ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>);
}


export default About;