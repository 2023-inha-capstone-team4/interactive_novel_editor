import { memo } from "react";
import "./App.css";
import Header from "./component/Header";
import ScenesListView from "./component/ScenesListView";
import ToolBox from "./component/ToolBox";
import MasterCanvas from "./lib/MasterCanvas";
import { MasterManager } from "./lib/MasterManager";
import { MasterManagerContext } from "./lib/MasterManagerContext";


function App() {


  return (
    <>
	<MasterManagerContext.Provider value={new MasterManager()}>
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
	</MasterManagerContext.Provider>
    </>
  );
}

export default memo(App);
