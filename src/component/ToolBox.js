import KeyframeEditor from './KeyframeEditor';
import LayerEditor from './LayerEditor';
import styles from './ToolBox.module.css';

function ToolBox()
{





    return (<>
        <section className={styles.toolbox}>
            <LayerEditor/>
            <KeyframeEditor/>
        </section>
        </>);
}




export default ToolBox;