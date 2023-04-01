import { useEffect, useRef, useState } from 'react';
import styles from './KeyframeEditor.module.css';


function KeyframeEditor()
{

    return <>
    <div className={styles.keyframe_editor_box}>
        <div className={styles.keyframe_editor_title}>키프레임 애니메이션 에디터</div>
        <div className={styles.keyframe_tools}></div>
    </div>
    </>;
}



export default KeyframeEditor;