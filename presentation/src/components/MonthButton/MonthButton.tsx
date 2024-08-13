import { useEffect, useState } from 'react';
import './MonthButton.css';

interface Props {
    month: number,
    onClick: Function,
    isSelected: boolean
}

export function MonthButton(props: Props) {
    const months = ["EMPTY", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [thisMonth, setThisMonth] = useState<string>(months[props.month]);
    const [isSelected, setIsSelected] = useState<boolean>(props.isSelected);

    useEffect(() => {

    }, [isSelected])

    const handleOnclick = () => {
        props.onClick(props.month)
    }

    return (
        <>
            <input type="button" value={thisMonth} className={`month`} onClick={handleOnclick} />
        </>
    )
}