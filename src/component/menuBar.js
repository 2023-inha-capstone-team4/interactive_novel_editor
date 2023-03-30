import styles from './menuBar.module.css';
import MenuItem from './menuItem';


function MenuBar(props)
{
    return <ul className={styles.menu_bar}>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        <MenuItem onClick={()=>{}} buttonImagePath="https://cdn-icons-png.flaticon.com/512/7170/7170850.png"/>
        
        
        {
            props.menus.map((menu)=>{

                return <MenuItem onClick={menu.onClick} buttonImagePath={menu.buttonImagePath}/>
            })
        }
    </ul>
}

export default MenuBar;