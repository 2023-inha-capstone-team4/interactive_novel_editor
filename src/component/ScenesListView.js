import { useContext, useEffect, useState } from 'react';
import { Scene } from '../lib/Scene';
import styles from './SceneListView.module.css';
import SceneItem from './SceneItem';

import { SceneManagerContext } from './CanvasReactContext';
import MenuBar from './menuBar';
import { MasterManagerContext } from '../lib/MasterManagerContext';
import MenuItem from './menuItem';

import abcIconSrc from '../resources/images/buttons/abc_icon.png';
import plusIconSrc from '../resources/images/buttons/plus_icon.png';
import copyIconSrc from '../resources/images/buttons/copy_icon.png';
import binIconSrc from '../resources/images/buttons/bin_icon.png';


function ScenesListView()
{

    let [sceneList, setSceneList] = useState([]);
    const masterManager=useContext(MasterManagerContext);

    const [selectedScene, setSelectedScene] =useState(masterManager.sceneManager.getCurrentScene());

    useEffect(
        ()=>{
            setSceneList([...masterManager.sceneManager.sceneList]);
        }
    ,[masterManager.sceneManager.sceneList, masterManager.sceneManager.curSceneIdx]);

    function selectScene(index)
    {
        masterManager.sceneManager.selectScene(index);
        setSelectedScene(masterManager.sceneManager.getCurrentScene());
    }


    function createNewScene()
    {}

    function changeSceneName()
    {}

    function copyCurrentScene()
    {}

    function deleteCurrentScene()
    {}


    return (<>
        <section className={styles.scene_view}>
            <div>
            <div className={styles.list_title}>Scenes</div>
            <div className={styles.scenes}>
            {
                sceneList.map((sceneItem, index, array)=>{

                    return <SceneItem key={index} scene={sceneItem} index={index} style={{
                        backgroundColor: selectedScene==masterManager.sceneManager.sceneList[index]? 'pink' : 'azure',

                    }} onClick={()=>{selectScene(index)}}></SceneItem>
                })
            }
            </div>
            </div>

            <MenuBar>
                <MenuItem imageSrc={plusIconSrc} onClick={createNewScene}></MenuItem>
                <MenuItem imageSrc={abcIconSrc} onClick={changeSceneName}></MenuItem>
                <MenuItem imageSrc={copyIconSrc} onClick={copyCurrentScene}></MenuItem>
                <MenuItem imageSrc={binIconSrc} onClick={deleteCurrentScene}></MenuItem>
            </MenuBar>
        </section>
            
            
            </>);
}


export default ScenesListView;