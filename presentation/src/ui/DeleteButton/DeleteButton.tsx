import { useEffect, useState } from 'react';
import './DeleteButton.css';

interface Props {
    deleteFunction: Function

}

export const DeleteButton = (props: Props) => {
    const [isSure, setIsSure] = useState<boolean>();
    const [text, setText] = useState<String>("");

    useEffect(() => {

    }, [isSure]);

    const handleOnClick = () => {
        if(isSure){
            setText("")
            // delete movement 
            props.deleteFunction();

        }else{
            setText("You sure?")
        }

        setIsSure(current => !current)
    }

    return <>
        <input type="button" onClick={handleOnClick} className={`delete-button ${isSure ? "":"delete-btn"} create-button`} value={text.toString()} />
    </>;
}