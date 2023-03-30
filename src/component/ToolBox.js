import KeyframeEditor from './KeyframeEditor';
import LayoutEditor from './LayerEditor';
import styles from './ToolBox.module.css';

function ToolBox()
{





    return (<>
        <section className={styles.toolbox}>
            <LayoutEditor/>
            <KeyframeEditor/>
        </section>
        </>);
}




export default ToolBox;