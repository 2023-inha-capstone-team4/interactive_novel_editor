import { useContext } from "react";
import styles from "./Header.module.css";
import { MasterManagerContext } from "../lib/MasterManagerContext";

function Header()
{
    const masterManager=useContext(MasterManagerContext);

	const onClickSaveProjectJson = () => {
		const jsonString = JSON.stringify(masterManager.sceneManager.sceneList, null, 2);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'data.json';
		document.body.appendChild(link);
		link.click();
		URL.revokeObjectURL(url);
	  };

    return (<>
        	<div className={styles.header}>
			<nav>
				<ul className={styles.options}>
					<li>새 프로젝트</li>
					<li onClick={()=>{onClickSaveProjectJson()}}>저장</li>
					<li onClick={()=>{}}>열기</li>
					<li onClick={()=>{}}>미리보기</li>
				</ul>
			</nav>
		</div>
    
    
    </>);
}


export default Header;