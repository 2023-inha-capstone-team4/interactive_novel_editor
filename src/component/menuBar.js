import styles from './menuBar.module.css';
import MenuItem from './menuItem';


function MenuBar(props)
{
    return (<div className={styles.menu_bar}>        
        {props.children}
    </div>);
}

export default MenuBar;