import { useContext, useEffect, useState } from "react";
import { MasterManagerContext } from "../lib/MasterManagerContext";
import styles from './SceneItem.module.css';

function SceneItem(props)
{
    const [scene, setScene] = useState(props.scene);
    const [isSelected, setIsSelected]=useState(props.isSelected);
    const [index, setIndex]=useState(props.index);

    const masterManager=useContext(MasterManagerContext);





    return (
        <div className={`${isSelected? styles.scene_item_box_selected : styles.scene_item_box}`} style={props.style} draggable="true" onClick={props.onClick}>
            <div className='scene_name'>{scene.name}</div>
        </div>
    );
}


export default SceneItem;