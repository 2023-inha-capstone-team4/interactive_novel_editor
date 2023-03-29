import { memo } from "react";
import './App.module.css';
import Main from "./Main";

function App() {


  return (
    <>
    <header>
		<nav>
			<ul>
				<li>NEW</li>
				<li>저장</li>
				<li>열기</li>
			</ul>
		</nav>
	</header>
	<main>
		<Main/>
	</main>
	<footer>
		<p>&copy; 2023 Woojung Kim. All rights reserved.</p>
    <p>Phone : 010-5483-6403</p>
    <p>E-mail : kimjung6408@naver.com</p>
	</footer>
    </>
  );
}

export default memo(App);
