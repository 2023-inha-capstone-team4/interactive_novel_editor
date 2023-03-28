import { memo } from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import './App.module.css';
import Contact from "./Contact";
import Main from "./Main";
import Portfolio from "./Portfolio";

function App() {
  return (
    <>
    <header>
		<nav>
			<ul>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
				<Link to='/portfolio'>Portfolio</Link>
				<Link to='/contact'>Contact</Link>
				
			</ul>
		</nav>
	</header>
	<main>
		<Routes>
			<Route path='/' Component={Main}/>			
			<Route path='/about' Component={About}/>
			<Route path='/portfolio' Component={Portfolio}/>
			<Route path='/contact' Component={Contact}/>
		</Routes>
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
