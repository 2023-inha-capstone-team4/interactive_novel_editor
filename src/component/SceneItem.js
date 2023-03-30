import { useState } from "react";
import styles from './SceneItem.module.css';

function SceneItem(props)
{
    const [scene, setScene] = useState(props.scene);


    return (
        <div className={styles.scene_item_box} draggable="true">
            <div className='scene_name'>{scene.name}</div>
        </div>
    );
}


export default SceneItem;