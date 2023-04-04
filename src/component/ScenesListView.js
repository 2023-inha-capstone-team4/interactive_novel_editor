import { useContext, useEffect, useRef, useState } from 'react';
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

import Modal from './Modal';


function ScenesListView()
{

    let [sceneList, setSceneList] = useState([]);
    const masterManager=useContext(MasterManagerContext);

    const [selectedScene, setSelectedScene] =useState(masterManager.sceneManager.getCurrentScene());
    
    const [isOpenChangeNameModal, setOpenChangeNameModal] = useState(false);

    const [nameText, setNameText] = useState("");




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
    {
        masterManager.sceneManager.createNewScene();
        selectScene(masterManager.sceneManager.sceneList.length-1);
    }

    function openChangeSceneNameModal()
    {
        setOpenChangeNameModal(true);
    }

    function changeSceneNameTextfield(event)
    {
        if(event.target.value.length==0) return;
        
        setNameText(event.target.value);
    }

    function changeSceneName()
    {
       let currentScene= masterManager.sceneManager.getCurrentScene();
       
       if(currentScene==null) return;

       currentScene.name=nameText;
    }

    function closeChangeSceneNameModal()
    {
        setOpenChangeNameModal(false);
    }

    function copyCurrentScene()
    {}

    function deleteCurrentScene()
    {
        masterManager.sceneManager.removeSelectedScene();
        selectScene(masterManager.sceneManager.curSceneIdx);
    }


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
                <MenuItem imageSrc={abcIconSrc} onClick={openChangeSceneNameModal}></MenuItem>
                <MenuItem imageSrc={copyIconSrc} onClick={copyCurrentScene}></MenuItem>
                <MenuItem imageSrc={binIconSrc} onClick={deleteCurrentScene}></MenuItem>
            </MenuBar>
        </section>
        
        {
            //change name modal
            isOpenChangeNameModal? 
            <Modal>
                <textarea className={styles.name_text_area} value={nameText} onChange={(e)=>{
                    changeSceneNameTextfield(e);
                }}></textarea>
                <div className={styles.modal_btn_box}>
                    <button onClick={()=>{
                        
                        changeSceneName();
                        closeChangeSceneNameModal();
                        setNameText("");
                        }}>변경하기</button>
                    <button onClick={closeChangeSceneNameModal}>취소</button>
                </div>
            </Modal>
            
            :null
        }
            
            
            </>);
}


export default ScenesListView;