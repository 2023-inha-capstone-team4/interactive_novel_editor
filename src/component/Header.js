import styles from "./Header.module.css";

function Header()
{




    return (<>
        	<header className={styles.header}>
			<nav>
				<ul className={styles.options}>
					<li>새 프로젝트</li>
					<li>저장</li>
					<li>열기</li>
				</ul>
			</nav>
		</header>
    
    
    </>);
}


export default Header;