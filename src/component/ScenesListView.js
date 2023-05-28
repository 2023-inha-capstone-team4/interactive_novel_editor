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
import LayerEditor from './LayerEditor';
import SoundListView from './SoundListView';


function ScenesListView()
{

    let [sceneList, setSceneList] = useState([]);
    const masterManager=useContext(MasterManagerContext);

    const [selectedSceneIndex, setSelectedSceneIndex] =useState(masterManager.sceneManager.curSceneIdx);
    
    const [isOpenChangeNameModal, setOpenChangeNameModal] = useState(false);

    const [nameText, setNameText] = useState("");


    function selectScene(index)
    {
        if(masterManager.sceneManager.curSceneIdx===index) return;


        masterManager.sceneManager.curSceneIdx=index;
        setSelectedSceneIndex(masterManager.sceneManager.curSceneIdx);
        setSceneList([...masterManager.sceneManager.sceneList]);

        masterManager.stop();
    }


    function createNewScene()
    {
        masterManager.sceneManager.createNewScene();
        setSelectedSceneIndex(masterManager.sceneManager.curSceneIdx);
        setSceneList([...masterManager.sceneManager.sceneList]);

        masterManager.stop();
    }

    function openChangeSceneNameModal()
    {
        setOpenChangeNameModal(true);
        setNameText(masterManager.sceneManager.getCurrentScene().name);
    }

    function changeSceneNameTextfield(event)
    {
        if(event.target.value.length<=15)
        {
            setNameText(event.target.value);
        }
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
        if(masterManager.sceneManager.sceneList.length===0) return;
        if(masterManager.sceneManager.sceneList.length===1) return; //최소 scene이 1개는 있어야 작품이 성립함.


        masterManager.sceneManager.removeSelectedScene();
        setSelectedSceneIndex(masterManager.sceneManager.curSceneIdx);
        setSceneList([...masterManager.sceneManager.sceneList]);

        masterManager.stop();
    }

    useEffect(() => {
        setSceneList([...masterManager.sceneManager.sceneList]);
    
    }, [masterManager.sceneManager.sceneList,selectedSceneIndex]);
    


    return (<>
        <section className={styles.scene_view}>
            <div>
            <div className={styles.list_title}>Scenes</div>
            <div className={styles.scenes}>
            {
                sceneList.map((sceneItem, index, array)=>{

                    return <SceneItem key={index} scene={sceneItem} index={index} isSelected={(selectedSceneIndex===index)} onClick={()=>{selectScene(index)}}></SceneItem>
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
        <LayerEditor currentSceneIndex={selectedSceneIndex}/>
        <SoundListView currentSceneIndex={selectedSceneIndex} soundList={masterManager.sceneManager.sceneList.length!==0? masterManager.sceneManager.getCurrentScene().soundList : null}/>
        
        {
            //change name modal
            isOpenChangeNameModal? 
            <Modal>
                <div>최대 15글자까지 가능합니다</div>
                <div>현재의 Scene이름 : {masterManager.sceneManager.getCurrentScene().name}</div>
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