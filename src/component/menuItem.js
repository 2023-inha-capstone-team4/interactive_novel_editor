import styles from './menuItem.module.css';


function MenuItem(props)
{

    return (
        <>
        <div className={styles.menu_button} onClick={props.onClick}>
            <img src="https://cdn-icons-png.flaticon.com/512/7170/7170850.png" width="100%" height="100%"></img>
        </div>
        </>
    );
}





export default MenuItem;