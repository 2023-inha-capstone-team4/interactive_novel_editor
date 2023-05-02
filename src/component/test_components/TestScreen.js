import MenuItem from "../menuItem";

import binIconSrc from '../../resources/images/buttons/bin_icon.png';
import { useState } from "react";
import TestModal from "./TestModal";


function TestScreen()
{
    function addKeyframe(keyframes, timestamp)
    {}

    function changeKeyframeValues()
    {}


    const [value, setValue] = useState('21');
    const [isOpenModal, setOpenModal] = useState(false);


    function closeModal()
    {
        setOpenModal(false);
    }

    function openModal()
    {
        setOpenModal(true);
    }

    function changeValue(newValue)
    {
        setValue(newValue);
    }


    return (<>
        <MenuItem onClick={()=>{openModal()}} imageSrc={binIconSrc}/>
        <div>{value}</div>
        {
            isOpenModal?<TestModal value={value} changeValue={changeValue} onClose={closeModal}/>:null
        }
    </>);
}


export default TestScreen;




