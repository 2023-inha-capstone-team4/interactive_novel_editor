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
function KeyframeModal(props)
{

    return (<>
        <Modal>
            <div className={styles.container}>
            <h3>
            {props.type==="image"? "이미지" :"텍스트"} 키프레임 에디터
            </h3>
                <div className={styles.input_row}>
                    <h5>위치</h5>
                    <div>가로</div> <input type="text" className={styles.input_box}></input>
                    <div>세로</div> <input type="text" className={styles.input_box}></input>
                </div>
                <div className={styles.input_row}>
                    <h5>크기</h5>
                    <div>가로</div><input type="text" className={styles.input_box}></input>
                    <div>세로</div><input type="text" className={styles.input_box}></input>
                </div >
                <div className={styles.input_row}>
                <h5>회전</h5><input type="text" className={styles.input_box}></input>
                </div>
                {props.type==="font"? 
                                <div className={styles.input_row}>
                                폰트 선택
                                <select className={styles.input_box}>
                                    <option value="font1">Sans serif</option>
                                    <option value="font1">네이버 나눔스퀘어</option>
                                    <option value="font1">에스코어 드림</option>
                                </select>
                                </div>
                
                :null}
                <h5 className={styles.input_row}>시간
                    <input type="text"></input>
                </h5>

                <div className={styles.input_row}>
                    <button onClick={props.OnOkClick}>확인</button>
                    <button onClick={props.OnCancelClick}>취소</button>
                </div>
            </div>
        </Modal>
    </>);
}


export default KeyframeModal;





