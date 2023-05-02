import { useState } from "react";
import Modal from "../Modal";


function TestModal({value , changeValue, onClose})
{

    const [modalValue, setModalValue] = useState(value);

    function handleChanges(event)
    {
        setModalValue(event.target.value);
    }

    function onClickOK(event)
    {
        changeValue(modalValue);
        onClose();
    }

    return (<>
        <Modal>
            <input type="text"  value={modalValue} onChange={handleChanges}></input>
            <button onClick={onClickOK}>ok</button>
            <button onClick={onClose}>cancel</button>
        </Modal>    
    </>);
}



export default TestModal;