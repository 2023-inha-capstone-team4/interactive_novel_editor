import { useState } from "react";
import styles from "./LayerItem.module.css";

function LayerItem(props) {


    //todo:
    //context를 통해 클릭 함수를 전달받아야 함. 선택했었던 layer를 해제하고, 이 레이어를 선택하도록 만든다.
    return <>
    <div
    
    draggable="true" className={`${styles.layer_item}`} style={{backgroundColor:props.isSelected? "pink": "azure"}} onClick={props.onClick} >{props.layer.name}</div>
    </>;
}


export default LayerItem;