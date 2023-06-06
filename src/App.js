import { memo } from 'react';
import './App.css';
import Header from './component/Header';
import KeyframeEditor from './component/KeyframeEditor';
import ScenesListView from './component/ScenesListView';
import LayerEditor from './component/LayerEditor';
import MasterCanvas from './component/MasterCanvas';
import { MasterManager } from './lib/MasterManager';
import { MasterManagerContext } from './lib/MasterManagerContext';

function App(props) {
  return (
    <>
      <MasterManagerContext.Provider value={new MasterManager(props.novelId)}>
        <Header />
        <main>
          <div className="top_contents">
            <ScenesListView />
            <MasterCanvas />
          </div>
          <KeyframeEditor />
        </main>
      </MasterManagerContext.Provider>
    </>
  );
}

export default memo(App);
