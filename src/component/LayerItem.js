import { useState } from "react";
import styles from "./LayerItem.module.css";

function LayerItem() {

    let [isSelected, setSelected] = useState(false);
    

    function click(){
        setSelected(!isSelected);
        console.log(isSelected);
    }


    //todo:
    //context를 통해 클릭 함수를 전달받아야 함. 선택했었던 layer를 해제하고, 이 레이어를 선택하도록 만든다.
    return <>
    <li draggable="true" className={`${styles.layer_item} ${isSelected? styles.selected_item : null}`} onClick={click} >LayerItem</li>
    </>;
}


export default LayerItem;