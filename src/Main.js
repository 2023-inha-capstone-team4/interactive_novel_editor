import './bootstrap/bootstrap.css';
import { useEffect, useRef } from 'react';
import './Main.css';
import myImage from './resources/images/universe.jpg';

function Main()
{
    const canvasRef=useRef(null);
    var canvas=null;
    var context=null;

    function render()
    {
        //if null, no rendering
        if(canvas==null || context==null)
        {
            return;
        }
        //set color
        context.fillStyle='#000000';
        context.fillRect(0,0, 800,600);
        context.restore();

        context.save();

        context.translate(100,100);
        context.rotate(30*Math.PI/180);
        

        const image = new Image();

        

        image.src=require('./resources/images/universe.jpg');

        context.drawImage(image,0,0, 10, 10);

        context.restore();

    }

    useEffect(()=>{
        canvas=canvasRef.current;
        context=canvas.getContext('2d');


        render(context);

    }, [render]);



    return (
        <>
        <canvas className='background_canvas position-absolute'  ref={canvasRef} style={{zIndex:-100, width:"100%", height:"100%"}}></canvas>
        <div className='main_content d-flex flex-column justify-content-center align-items-center' style={{height:"100%"}}>
            <h1 >Woojung's Dev Journey</h1>
            <br/>
            <h3 className='small_text'>우정의 개발 여행</h3>
            <h3>오신 것을 환영합니다</h3>
        </div>  
        </>
    );
}



export default Main;