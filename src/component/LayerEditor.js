import { useState } from 'react';
import { Layer } from '../lib/Layer';
import LayerItem from './LayerItem';
import styles from './LayoutEditor.module.css';
import MenuBar from './menuBar';

function LayoutEditor()
{

    const [layers, setLayers] = useState([]);

    for(var i=0; i<100; i++)
    {
        layers.push(new Layer());
    }


    return <>
    <section className={styles.layer_editor_box}>
        <div>
            <div className={styles.layer_editor_title} >레이아웃</div>
            <div className={styles.layer_list}>
                {
                    layers.map((layer)=>{
                        return <LayerItem/>
                    })
                }

            </div>
        </div>
        <MenuBar menus={[]}/>
    </section>
    </>;
}



export default LayoutEditor;