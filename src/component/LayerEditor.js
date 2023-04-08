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

function LayerEditor(props)
{

    const masterManager=useContext(MasterManagerContext);
    const [currentLayerList, setLayerList] = useState([]);

    const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

    useEffect(()=>{
        setLayerList(masterManager.sceneManager.getCurrentScene().layerList);
    },[masterManager.curSceneIdx, props.currentSceneIndex]);


    function selectLayer(index)
    {
        setSelectedLayerIndex(index);
        masterManager.sceneManager.currentLayerIndex=index;
    }

    function addImageLayer()
    {

    }

    function addTextLayer()
    {

    }

    function addEffectLayer()
    {}

    function copyCurrentLayer()
    {}

    function changeCurrentLayerName()
    {}

    function deleteCurrentLayer()
    {}


    return <>
    <section className={styles.layer_editor_box}>
            <div className={styles.layer_editor_title} >레이어</div>
            <div className={styles.layer_list}>
                {
                    currentLayerList.map((layer, index, arr)=>{
                        return <LayerItem key={index} isSelected={(selectedLayerIndex===index)}         
                        
                        layer={layer} onClick={()=>{

                            selectLayer(index);

                        }}/>
                    })
                }
        </div>
        <MenuBar>
            <MenuItem imageSrc={imgIconSrc} onClick={()=>{addImageLayer()}}></MenuItem>
                <MenuItem imageSrc={TIconSrc} onClick={()=>{addTextLayer()}}></MenuItem>
                <MenuItem imageSrc={fxIconSrc} onClick={()=>{addEffectLayer()}}></MenuItem>
                <MenuItem imageSrc={copyIconSrc} onClick={()=>{copyCurrentLayer()}}></MenuItem>
                <MenuItem imageSrc={abcIconSrc} onClick={()=>{changeCurrentLayerName()}}></MenuItem>
                <MenuItem imageSrc={binIconSrc} onClick={()=>{deleteCurrentLayer()}}></MenuItem>
        </MenuBar>
    </section>
    </>;
}



export default LayerEditor;