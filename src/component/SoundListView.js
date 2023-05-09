import MenuBar from "./menuBar";
import MenuItem from "./menuItem";

import abcIconSrc from '../resources/images/buttons/abc_icon.png';
import plusIconSrc from '../resources/images/buttons/plus_icon.png';
import copyIconSrc from '../resources/images/buttons/copy_icon.png';
import binIconSrc from '../resources/images/buttons/bin_icon.png';

import styles from './SoundListView.module.css';
import { useRef, useState } from "react";


function SoundListView({soundList})
{
    const [sndList, setSoundList] = useState(soundList);
    const [selectSoundIndex, setSelectSoundIndex] = useState(0);

    var soundFileInputRef=useRef(null);

    function createNewSound(e)
    {
        const file=soundFileInputRef.current.files[0];
        const fileURL=URL.createObjectURL(file);
        
    }

    function openChangeSoundMameModal()
    {}

    function copyCurrentSound()
    {}

    function deleteCurrentSound()
    {}


    return (<>
    <section className={styles.list_view}>
        <div className={styles.list_title}>Sounds</div>
        <div className={styles.sounds}>
            {soundList!==null? soundList.map(soundObject=>(
                <div>
                    soundObject.name
                </div>
            )): null}
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
    
    </>);
}


export default SoundListView;