import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ImageLayer, Layer, TextLayer } from '../lib/Layer';
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
import { Keyframe, TextKeyframe } from '../lib/Keyframe';
import Vector2D from '../lib/Vector2D';
import Modal from './Modal';

function LayerEditor(props)
{

    const masterManager=useContext(MasterManagerContext);
    const [currentLayerList, setLayerList] = useState([]);

    const [selectedLayerIndex, setSelectedLayerIndex] = useState(-1);
    const fileInputRef = useRef(null);

    const [isOpenChangeNameModal, setIsOpenChangeNameModal] =useState(false);
    const [nameText, setNameText] =useState("");


    useEffect(()=>{
        setLayerList(masterManager.sceneManager.getCurrentScene().layerList);
    },[masterManager.curSceneIdx, props.currentSceneIndex]);


    function selectLayer(index)
    {
        setSelectedLayerIndex(index);
        masterManager.sceneManager.currentLayerIndex=index;
    }

    function addTextLayer()
    {
        var newTextLayer=new TextLayer();
        newTextLayer.addKeyframe(new TextKeyframe(0,new Vector2D(masterManager.canvasWidth/2,masterManager.canvasHeight/2), new Vector2D(1,1),0,1,{red:128, green:128, blue:128}));
        masterManager.sceneManager.getCurrentScene().addLayer(newTextLayer);

        selectLayer(masterManager.sceneManager.getCurrentScene().selectedLayerIndex);
        setLayerList([...masterManager.sceneManager.getCurrentScene().layerList]);
    }

    function copyCurrentLayer()
    {}

    function changeCurrentLayerName()
    {
        setIsOpenChangeNameModal(true);
    }

    function deleteCurrentLayer()
    {
        masterManager.sceneManager.getCurrentScene().selectedLayerIndex=selectedLayerIndex;
        masterManager.sceneManager.getCurrentScene().removeSelectedLayer();
        selectLayer(masterManager.sceneManager.getCurrentScene().selectedLayerIndex);
        setLayerList([...masterManager.sceneManager.getCurrentScene().layerList]);
        
    }

    function handleLoadImageLayer(e)
    {
        const file=fileInputRef.current.files[0];
        const fileURL=URL.createObjectURL(file);

        var newImageLayer=new ImageLayer(fileURL);

        newImageLayer.addKeyframe(new Keyframe(0,new Vector2D(masterManager.canvasWidth/2,masterManager.canvasHeight/2), new Vector2D(1,1),0,1));
        masterManager.sceneManager.getCurrentScene().addLayer(newImageLayer);
        setSelectedLayerIndex(masterManager.sceneManager.getCurrentScene().selectedLayerIndex);
        setLayerList([...masterManager.sceneManager.getCurrentScene().layerList]);
        
    }


    function changeLayerNameTextfield(event)
    {
            setNameText(event.target.value);
    }

    function changeLayerName()
    {
       let currentScene= masterManager.sceneManager.getCurrentScene();
       
       if(currentScene==null) return;
       if(currentScene.layerList.length===0) return;

       let currentLayer=currentScene.layerList[selectedLayerIndex];

       currentLayer.name=nameText;
    }

    function closeLayerNameModal()
    {
        setIsOpenChangeNameModal(false);
    }


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
            <MenuItem imageSrc={imgIconSrc} onClick={()=>{}}>
            <input

        type="file"
        accept=".jpg,.png,.gif"
        onChange={handleLoadImageLayer}
        ref={fileInputRef}
        color="transparent"
      />
            </MenuItem>
                <MenuItem imageSrc={TIconSrc} onClick={()=>{addTextLayer()}}></MenuItem>
                <MenuItem imageSrc={copyIconSrc} onClick={()=>{copyCurrentLayer()}}></MenuItem>
                <MenuItem imageSrc={abcIconSrc} onClick={()=>{changeCurrentLayerName()}}></MenuItem>
                <MenuItem imageSrc={binIconSrc} onClick={()=>{deleteCurrentLayer()}}></MenuItem>
        </MenuBar>
    </section>
    {
            //change name modal
            isOpenChangeNameModal? 
            <Modal>
                <h5>레이어 이름을 변경합니다.</h5>
                <div>텍스트 레이어의 경우, 화면에 반영됩니다</div>
                <div>현재의 Layer이름 : {masterManager.sceneManager.getCurrentScene().layerList[selectedLayerIndex].name}</div>
                <textarea className={styles.name_text_area} value={nameText} onChange={(e)=>{
                    changeLayerNameTextfield(e);
                }}></textarea>
                <div className={styles.modal_btn_box}>
                    <button onClick={()=>{
                        
                        changeLayerName();
                        closeLayerNameModal();
                        setNameText("");
                        }}>변경하기</button>
                    <button onClick={closeLayerNameModal}>취소</button>
                </div>
            </Modal>
            :null}
    </>;
}



export default LayerEditor;