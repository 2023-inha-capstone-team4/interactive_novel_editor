import styles from './menuItem.module.css';

/**
 * 
 * @param {
 *  onClick : 클릭시 실행할 함수
 *
 *  }props 
 * 
 * @param {
 * imageSrc : 메뉴 버튼 이미지 경로
 * 
 * }props
 * 
 * @returns MenuItem을 나타내는 div 컴포넌트
 */
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