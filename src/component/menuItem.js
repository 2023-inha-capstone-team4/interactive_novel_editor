import styles from './menuItem.module.css';


function MenuItem(props)
{

    return (
        <>
        <div className={styles.menu_button} onClick={props.onClick}>
            <img className={styles.button_image} src={props.imageSrc}></img>
        </div>
        </>
    );
}





export default MenuItem;