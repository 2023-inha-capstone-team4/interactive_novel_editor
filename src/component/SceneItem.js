import { useContext, useEffect, useState } from "react";
import { MasterManagerContext } from "../lib/MasterManagerContext";
import styles from './SceneItem.module.css';

function SceneItem(props)
{
    const [scene, setScene] = useState(props.scene);
    const [index, setIndex]=useState(props.index);

    const masterManager=useContext(MasterManagerContext);





    return (
        <div className={styles.scene_item_box} style={{backgroundColor:props.isSelected?"pink":null }} draggable="true" onClick={props.onClick}>
            <div className='scene_name'>{scene.name}</div>
        </div>
    );
}


export default SceneItem;