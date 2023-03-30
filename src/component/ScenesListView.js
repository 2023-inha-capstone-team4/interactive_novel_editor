import { useState } from 'react';
import { Scene } from '../lib/Scene';
import styles from './SceneListView.module.css';
import SceneItem from './SceneItem';

import { SceneManagerContext } from './CanvasReactContext';
import MenuBar from './menuBar';


function ScenesListView()
{
    let [sceneList, setSceneList] = useState([]);


    sceneList.push(new Scene());
    


    return (<>
        <section className={styles.scene_view}>
            <div>
            <div className={styles.list_title}>Scenes</div>
            <div className={styles.scenes}>
            {
                sceneList.map(sceneItem=>{
                    return <SceneItem scene={sceneItem}></SceneItem>
                })
            }
            </div>
            </div>
            <MenuBar menus={[]}/>
        </section>
            
            
            </>);
}


export default ScenesListView;