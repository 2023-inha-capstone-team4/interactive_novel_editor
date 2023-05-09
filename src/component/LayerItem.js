import { useContext, useState } from "react";
import { MasterManagerContext } from "../lib/MasterManagerContext";
import styles from "./LayerItem.module.css";

function LayerItem(props) {

    const masterManager=useContext(MasterManagerContext);
    
    const [repeatType, setRepeatType] = useState(props.repeatType);
    //todo:
    //context를 통해 클릭 함수를 전달받아야 함. 선택했었던 layer를 해제하고, 이 레이어를 선택하도록 만든다.

    function chnageRepeatType()
    {
        switch(repeatType)
        {
            case "none":
                setRepeatType("forward");
                masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.getCurrentScene().selectedLayerIndex].repeatType="forward";
                break;
            case "forward":
                 setRepeatType("reverse");
                 masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.getCurrentScene().selectedLayerIndex].repeatType="reverse";
                 break;
            case "reverse":
                setRepeatType("none");
                masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.getCurrentScene().selectedLayerIndex].repeatType="none";
                break;
            default:
               setRepeatType("none");
               masterManager.sceneManager.getCurrentScene().layerList[masterManager.sceneManager.getCurrentScene().selectedLayerIndex].repeatType="none";
               break;
            
        }
    }
    


    return <>
    <div
    
    draggable="true" className={`${styles.layer_item}`} style={{backgroundColor:props.isSelected? "pink": "azure"}} onClick={props.onClick} >{props.layer.name}
    {repeatType==="none"? <div className={styles.repeat_type} onClick={chnageRepeatType}>X</div>:null}
    {repeatType==="forward"? <div className={styles.repeat_type} onClick={chnageRepeatType}>→</div>:null}
    {repeatType==="reverse"? <div className={styles.repeat_type} onClick={chnageRepeatType}>↔</div>:null}
    </div>
    </>;
}


export default LayerItem;