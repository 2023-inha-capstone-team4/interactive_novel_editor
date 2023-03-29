import './bootstrap/bootstrap.css';
import MasterCanvas from './lib/MasterCanvas';
import './Main.css';

function Main()
{


    return (
        <>
        <div className='main_content'>
            <div className='scene_list'>scenes</div>
            <MasterCanvas></MasterCanvas>
            <div className='editor_toolbox'>toolbox</div>
        </div>
        </>
    );
}



export default Main;