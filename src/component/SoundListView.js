import MenuBar from "./menuBar";
import MenuItem from "./menuItem";

import abcIconSrc from '../resources/images/buttons/abc_icon.png';
import plusIconSrc from '../resources/images/buttons/plus_icon.png';
import copyIconSrc from '../resources/images/buttons/copy_icon.png';
import binIconSrc from '../resources/images/buttons/bin_icon.png';

import styles from './SoundListView.module.css';


function SoundListView({soundList})
{

    function createNewSound()
    {}

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
            <MenuItem imageSrc={plusIconSrc} onClick={createNewSound}></MenuItem>
            <MenuItem imageSrc={abcIconSrc} onClick={openChangeSoundMameModal}></MenuItem>
            <MenuItem imageSrc={copyIconSrc} onClick={copyCurrentSound}></MenuItem>
            <MenuItem imageSrc={binIconSrc} onClick={deleteCurrentSound}></MenuItem>
        </MenuBar>
    </section>
    
    </>);
}


export default SoundListView;