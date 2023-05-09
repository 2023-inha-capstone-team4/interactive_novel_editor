import { useState } from "react";
import { Keyframe, TextKeyframe } from "../../lib/Keyframe";
import Vector2D from "../../lib/Vector2D";
import Modal from "../Modal";
import styles from "./KeyframeModal.module.css";



/** 
 * Keyframe 데이터를 표시하고, 각 keyframe의 값을 수정할 수 있는 모달 컴포넌트 입니다.
 * 
 * @author Woojung
 * @augments props Keyframes, KeyframeIndex, type(image, text), OnOkClick, OnCancelClcik
 * @version v0.1
 * @function 
 * 
 * Last Updated: 2023-04-26
 * **/
function KeyframeModal({type, Keyframes, OnChangeKeyframe, OnCancelClick})
{
    let keyframe=null;
    let selectedIndex=-1;

    Keyframes.forEach((item, index, array)=>{
        
        if(item.isSelected)
        {
            keyframe=item;
            selectedIndex=index;
        }
    });

    const [posX, setposX] = useState(keyframe.position.x);
    const [posY, setposY] = useState(keyframe.position.y);
    const [scaleX, setscaleX] = useState(keyframe.scale.x);
    const [scaleY, setscaleY] = useState(keyframe.scale.y);
    const [rot, setrot] =useState(keyframe.rotation);
    const [timeLabel, settimeLabel] =useState(keyframe.timeLabel);
    const [color, setcolor] =useState( type==="text" ? keyframe.color : null);
    const [alpha, setalpha] =useState(keyframe.image_fade_alpha);

    const [red, setRed] =useState(type==="text" ? keyframe.color.red : null);
    const [green, setGreen] =useState(type==="text" ? keyframe.color.green : null);
    const [blue, setBlue] =useState(type==="text" ? keyframe.color.blue : null);


    function changePosX(event)
    {
        setposX(event.target.value);
    }

    function changePosY(event)
    {
        setposY(event.target.value);
    }

    function changeScaleY(event)
    {
        setscaleY(event.target.value);
    }

    function changeScaleX(event)
    {
        setscaleX(event.target.value);
    }

    function changeRotation(event)
    {
        setrot(event.target.value);
    }

    function changeTimeLabel(event)
    {
        if(0<= event.target.value && event.target.value<=15)
        {
            settimeLabel(event.target.value);
        }
    }

    function changeImageFadeAlpha(event)
    {
        if(0.0<= event.target.value && event.target.value <=1.0)
        {
            setalpha(event.target.value);
        }
    }

    function changeColor(event)
    {
        setcolor(event.target.value);
    }

    function changeRed(event)
    {
        setRed(event.target.value);
    }

    
    function changeGreen(event)
    {
        setGreen(event.target.value);
    }

    
    function changeBlue(event)
    {
        setBlue(event.target.value);
    }

    function changeKeyframeData()
    {
        switch(type)
        {
            case "text":
                
                OnChangeKeyframe(new TextKeyframe(timeLabel,new Vector2D(posX, posY),new Vector2D(scaleX,scaleY), rot,alpha,{red:red, green:green, blue:blue}),selectedIndex);
                break;
            case "image":
                
                OnChangeKeyframe(new Keyframe(timeLabel,new Vector2D(posX, posY),new Vector2D(scaleX,scaleY), rot,alpha),selectedIndex);
            break;
        }
    }


    return (    
    <>
        <Modal>
            <div className={styles.container}>
            <h3>
            {type==="image"? "이미지" :"텍스트"} 키프레임 에디터
            </h3>
                <div className={styles.input_row}>
                    <h5>위치</h5>
                    <div>가로</div> <input type="number" className={styles.input_box} value={posX} onChange={(e)=>{changePosX(e)}}></input>
                    <div>세로</div> <input type="number" className={styles.input_box} value={posY} onChange={(e)=>{changePosY(e)}}></input>
                </div>
                <div className={styles.input_row}>
                    <h5>크기</h5>
                    <div>가로</div><input type="number" className={styles.input_box} value={scaleX} onChange={(e)=>{changeScaleX(e)}}></input>
                    <div>세로</div><input type="number" className={styles.input_box} value={scaleY} onChange={(e)=>{changeScaleY(e)}}></input>
                </div >
                <div className={styles.input_row}>
                <h5>불투명도</h5><input type="number" className={styles.input_box} value={alpha} onChange={(e)=>{changeImageFadeAlpha(e)}}></input>
                </div>
                <div className={styles.input_row}>
                <h5>회전</h5><input type="number" className={styles.input_box} value={rot} onChange={(e)=>{changeRotation(e)}}></input>
                </div>
                {type==="text"? <>
                <div className={styles.input_row}>
                    <h5>색상</h5>
                    <div>Red</div> <input type="number" className={styles.input_box} value={red} onChange={(e)=>{changeRed(e)}}></input>
                    <div>Green</div> <input type="number" className={styles.input_box} value={green} onChange={(e)=>{changeGreen(e)}}></input>
                    <div>Blue</div> <input type="number" className={styles.input_box} value={blue} onChange={(e)=>{changeBlue(e)}}></input>
                    </div>
                    </> :null}
                <h5 className={styles.input_row}>시간
                    <input type="number" value={timeLabel} onChange={(e)=>{changeTimeLabel(e)}}></input>
                </h5>

                <div className={styles.input_row}>
                    <button onClick={()=>{

                        changeKeyframeData();

                    }}>확인</button>
                    <button onClick={OnCancelClick}>취소</button>
                </div>
            </div>
        </Modal>
    </>);
}


export default KeyframeModal;





