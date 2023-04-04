import styles from "./Modal.module.css";

function Modal(props)
{



    return (<>
        <div className={styles.black_background}>
            <div className={styles.container}>
            {props.children}
            </div>
        </div>
        </>
    );
}

export default Modal;