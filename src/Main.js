import './bootstrap/bootstrap.css';
import { useEffect, useRef } from 'react';
import './Main.css';
import myImage from './resources/images/universe.jpg';

function Main()
{



    return (
        <>
        <div className='main_content d-flex flex-column justify-content-center align-items-center' style={{height:"100%"}}>
            <h1 >Woojung's Dev Journey</h1>
            <br/>
            <h3 className='small_text'>Good</h3>
            <h3>오신 것을 환영합니다</h3>
        </div>  
        </>
    );
}



export default Main;