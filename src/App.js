import { memo } from "react";
import "./App.css";
import Header from "./component/Header";
import ScenesListView from "./component/ScenesListView";
import ToolBox from "./component/ToolBox";
import MasterCanvas from "./lib/MasterCanvas";

function App() {


  return (
    <>
	<div className='container'>
    	<Header/>
		<main>
			<ScenesListView/>
			<div className='canvas'>
				<MasterCanvas />
			</div>
			<ToolBox/>
		</main>
	</div>
    </>
  );
}

export default memo(App);
