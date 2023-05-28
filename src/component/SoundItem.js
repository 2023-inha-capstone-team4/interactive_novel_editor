import { useContext, useState } from "react";
import { MasterManagerContext } from "../lib/MasterManagerContext";
import styles from "./LayerItem.module.css";

function SoundItem({name, onClick, isSelected}) {

    const masterManager=useContext(MasterManagerContext);

    


    return <>
    <div
    
    draggable="true" className={`${styles.layer_item}`} style={{backgroundColor:isSelected? "lavender": "azure"}} onClick={onClick} >{name}
    </div>
    </>;
}


export default SoundItem;