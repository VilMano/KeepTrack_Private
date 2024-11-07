import { useEffect, useState } from 'react';
import './MonthSlider.css';
import { MonthButton } from '../MonthButton/MonthButton';

interface Props {
    setSelectedMonth: Function,
    month: number
}

export function MonthSlider(props: Props) {
    const months = ["EMPTY", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const now = new Date();
    const [thisMonth, setThisMonth] = useState<string>(months[props.month]);

    useEffect(() => {

    }, [thisMonth]);

    const handleClickMonth = (month: number) => {
        props.setSelectedMonth(month);
        setThisMonth(months[month]);
    }

    return (
        <>
            <div className="month-slider">
                {months.map((month: string, i: number) => {
                    if(i > 0 && i <= now.getMonth()+1){
                        if(month === thisMonth)
                            return (<MonthButton key={i} month={i} onClick={handleClickMonth} isSelected={true}></MonthButton>);
    
                        return (<MonthButton key={i} month={i} onClick={handleClickMonth} isSelected={false}></MonthButton>)
                    }

                 })}
            </div>
        </>
    )
}