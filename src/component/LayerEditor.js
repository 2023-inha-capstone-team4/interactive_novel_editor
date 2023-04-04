import { useEffect, useLayoutEffect, useState } from 'react';
import { Layer } from '../lib/Layer';
import LayerItem from './LayerItem';
import styles from './LayoutEditor.module.css';
import MenuBar from './menuBar';

import imgIconSrc from '../resources/images/buttons/img_icon.png';
import abcIconSrc from '../resources/images/buttons/abc_icon.png';
import TIconSrc from '../resources/images/buttons/t_icon.png';
import fxIconSrc from '../resources/images/buttons/fx_icon.png';
import copyIconSrc from '../resources/images/buttons/copy_icon.png';
import binIconSrc from '../resources/images/buttons/bin_icon.png';
import { useContext } from 'react';
import { MasterManagerContext } from '../lib/MasterManagerContext';

import MenuItem from './menuItem';

function LayerEditor()
{

    const [layers, setLayers] = useState([]);
    const masterManager=useContext(MasterManagerContext);

    const [selectedLayer, setSelectedLayer] = useState(null);

    useEffect(()=>{
        setLayers([...masterManager.sceneManager.getCurrentScene().layerList]);
    }
    ,[]);


    return <>
    <section className={styles.layer_editor_box}>
            <div className={styles.layer_editor_title} >레이어</div>
            <div className={styles.layer_list}>
                {
                    layers.map((layer, index, arr)=>{
                        return <LayerItem key={index} layer={layer}/>
                    })
                }
        </div>
        <MenuBar>
            <MenuItem imageSrc={imgIconSrc} onClick={()=>{}}></MenuItem>
                <MenuItem imageSrc={TIconSrc} onClick={()=>{}}></MenuItem>
                <MenuItem imageSrc={fxIconSrc} onClick={()=>{}}></MenuItem>
                <MenuItem imageSrc={copyIconSrc} onClick={()=>{}}></MenuItem>
                <MenuItem imageSrc={abcIconSrc} onClick={()=>{}}></MenuItem>
                <MenuItem imageSrc={binIconSrc} onClick={()=>{}}></MenuItem>
        </MenuBar>
    </section>
    </>;
}



export default LayerEditor;