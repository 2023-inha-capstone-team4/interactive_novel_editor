import MenuBar from "./menuBar";
import MenuItem from "./menuItem";

import abcIconSrc from '../resources/images/buttons/abc_icon.png';
import plusIconSrc from '../resources/images/buttons/plus_icon.png';
import copyIconSrc from '../resources/images/buttons/copy_icon.png';
import binIconSrc from '../resources/images/buttons/bin_icon.png';

import styles from './SoundListView.module.css';
import { useEffect, useRef, useState } from "react";
import SoundItem from "./SoundItem";
import { SoundEvent } from "../lib/SoundEvent";
import { useContext } from "react";
import { MasterManagerContext } from "../lib/MasterManagerContext";
import Modal from "./Modal";


function SoundListView({currentSceneIndex,soundList})
{
    const [sndList, setSoundList] = useState(soundList);
    const [selectSoundIndex, setSelectSoundIndex] = useState(0);
    const masterManager=useContext(MasterManagerContext);

    const [isOpenChangeNameModal, setIsOpenChangeNameModal] = useState(false);
    const [nameText, setNameText] =useState("");

    var soundFileInputRef=useRef(null);

    useEffect(()=>{
        setSoundList(masterManager.sceneManager.getCurrentScene().soundList);
    },[currentSceneIndex]);

    function createNewSound(e)
    {
        const file=soundFileInputRef.current.files[0];
        const fileURL=URL.createObjectURL(file);

        var newSound=new SoundEvent(1,fileURL, null);
        masterManager.sceneManager.getCurrentScene().addSound(newSound);
        setSelectSoundIndex(masterManager.sceneManager.getCurrentScene().soundList.length-1);
        setSoundList([...masterManager.sceneManager.getCurrentScene().soundList]);
        
    }

    function openChangeSoundMameModal()
    {
        if(masterManager.sceneManager.getCurrentScene().soundList.length===0) return;

        setIsOpenChangeNameModal(true);
    }

    function changeSoundName()
    {
        let currentScene= masterManager.sceneManager.getCurrentScene();
       
        if(currentScene==null) return;
        if(currentScene.soundList.length===0) return;

        masterManager.sceneManager.getCurrentScene().soundList[selectSoundIndex].name=nameText;
    }

    function changeSoundNameTextfield(event)
    {
        if(event.target.value.length<=15)
        {
            setNameText(event.target.value);
        }
    }

    function closeChangeSoundNameModal()
    {
        setIsOpenChangeNameModal(false);
    }

    function copyCurrentSound()
    {}

    function deleteCurrentSound()
    {}

    function selectSound(index)
    {
        setSelectSoundIndex(index);
    }


    return (<>
    <section className={styles.list_view}>
        <div className={styles.list_title}>Sounds</div>
        <div className={styles.sounds}>
        {
                    sndList.map((soundEvent, index, arr)=>{
                        return <SoundItem key={index} isSelected={(selectSoundIndex===index)}
                        name={soundEvent.name}         
                        soundEvent={soundEvent} onClick={()=>{

                            selectSound(index);

                        }}/>
                    })
                }
        </div>
        <MenuBar>
            <MenuItem imageSrc={plusIconSrc} onClick={()=>{}}>
            <input

                type="file"
                id="sound_file"
                accept="audio/*"
                onChange={createNewSound}
                ref={soundFileInputRef}
                style={{
                    display:"none"
                }}
                />
                <label for="sound_file"> sound</label>
            </MenuItem>
            <MenuItem imageSrc={abcIconSrc} onClick={openChangeSoundMameModal}></MenuItem>
            <MenuItem imageSrc={copyIconSrc} onClick={copyCurrentSound}></MenuItem>
            <MenuItem imageSrc={binIconSrc} onClick={deleteCurrentSound}></MenuItem>
        </MenuBar>
    </section>
    {
        isOpenChangeNameModal?
        <Modal>
                <div>최대 15글자까지 가능합니다</div>
                <div>현재의 Sound이름 : {masterManager.sceneManager.getCurrentScene().soundList[selectSoundIndex].name}</div>
                <textarea className={styles.name_text_area} value={nameText} onChange={(e)=>{
                    changeSoundNameTextfield(e);
                }}></textarea>
                <div className={styles.modal_btn_box}>
                    <button onClick={()=>{
                        
                        changeSoundName();
                        closeChangeSoundNameModal();
                        setNameText("");
                        }}>변경하기</button>
                    <button onClick={closeChangeSoundNameModal}>취소</button>
                </div>
            </Modal>
    :null}
    
    </>);
}


export default SoundListView;