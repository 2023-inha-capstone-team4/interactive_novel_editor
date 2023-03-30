import styles from './LayoutEditor.module.css';
import MenuBar from './menuBar';

function LayoutEditor()
{




    return <>
    <section className={styles.layout_editor_box}>
        <div>
            <div className={styles.layout_editor_title} >레이아웃</div>
            <ul className={styles.layout_list}>
            </ul>
        </div>
        <MenuBar menus={[]}/>
    </section>
    </>;
}



export default LayoutEditor;