import { useState } from 'react';
import { Layer } from '../lib/Layer';
import LayerItem from './LayerItem';
import styles from './LayoutEditor.module.css';
import MenuBar from './menuBar';

function LayerEditor()
{

    const [layers, setLayers] = useState([]);

    for(var i=0; i<100; i++)
    {
        layers.push(new Layer());
    }


    return <>
    <section className={styles.layer_editor_box}>
            <div className={styles.layer_editor_title} >레이어</div>
            <div className={styles.layer_list}>
                {
                    layers.map((layer)=>{
                        return <LayerItem/>
                    })
                }
        </div>
        <MenuBar menus={[]}/>
    </section>
    </>;
}



export default LayerEditor;