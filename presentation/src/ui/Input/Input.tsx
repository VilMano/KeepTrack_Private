import { useEffect, useState } from 'react';
import { InputType } from '../../models/InputType';
import './Input.css';
import { setDefaultResultOrder } from 'dns';

interface Props {
    label: String;
    type: InputType;
    categories?: String[];
    defaultValue?: any;
    setDefaultValue: Function;
}

export const Input = (props: Props) => {
    var date = new Date();

    const [year, setYear] = useState(date.getUTCFullYear());
    const [month, setMonth] = useState(date.getMonth()+1);
    const [day, setDay] = useState(date.getUTCDate());

    const [category, setCategory] = useState('Select a category');

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if(props.type == InputType.date){
            props.setDefaultValue(new Date(`${year}-${month}-${day}`));
        }

    }, [selected]);

    const handleDateChange = (dateParam: string, value: string) => {
        switch (dateParam) {
            case 'day':
                setDay(parseInt(value))
                break;
            case 'month':
                setMonth(parseInt(value))
                break;
            case 'year':
                setYear(parseInt(value))
                break;

            default:
                break;
        }

        props.setDefaultValue(new Date(`${year}-${month}-${day}`));
    }

    if (props.type == InputType.number) {
        return (
            <>
                <div className="column">
                    <label>{props.label}</label>
                    <input type={props.type.toString()} value={props.defaultValue} onChange={e => props.setDefaultValue(parseFloat(e.target.value))} />
                </div>
            </>
        )
    }

    if (props.type == InputType.date) {
        // props.setDefaultValue(new Date(`${year}-${month}-${day}`));

        return (
            <>
                <div className="column">
                    <label>Year</label>
                    <input type="number" value={year} onChange={e => handleDateChange('year' , e.target.value)} />
                </div>
                <div className="column">
                    <label>Month</label>
                    <input type="number" value={month} onChange={e => handleDateChange('month', e.target.value)} />
                </div>
                <div className="column">
                    <label>Day</label>
                    <input type="number" value={day} onChange={e => handleDateChange('day' ,e.target.value)} />
                </div>
            </>
        )
    }

    if (props.type == InputType.select) {
        return (
            <>
                <label>Category</label>
                <input readOnly type="text" onClick={(e) => { setSelected(!selected) }} value={category} />
                <div className={`column column-center ${selected ? "" : "hidden"}`} style={{ width: "98%" }}>
                    {props.categories?.map((categoryItem: any) => {
                        return (<>
                            <div className="option" onClick={e => { setSelected(false); setCategory(categoryItem) }}>{categoryItem}</div>
                        </>);
                    })}
                </div>
            </>
        )
    }

    return (<>
        <div style={{ width: "100%" }} className="column">
            <label>{props.label}</label>
            <input type={props.type.toString()} value={props.defaultValue} onChange={(e) => { props.setDefaultValue(e.target.value) }} />
        </div>
    </>);
}