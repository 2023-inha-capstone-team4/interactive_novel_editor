import styles from './menuItem.module.css';


function MenuItem(props)
{

    return (
        <>
        <div className={styles.menu_button} onClick={props.onClick}>
            <img className={styles.button_image} src="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"></img>
        </div>
        </>
    );
}





export default MenuItem;