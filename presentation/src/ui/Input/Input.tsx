import { useEffect, useState } from 'react';
import { InputType } from '../../models/InputType';
import './Input.css';

interface Props {
    label: String;
    type: InputType;
    categories?: String[];
    defaultValue?: any;
    setDefaultValue: Function;
}

export const Input = (props: Props) => {
    var date = new Date();
    const [number, setNumber] = useState('');

    const [year, setYear] = useState(date.getUTCFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [day, setDay] = useState(date.getUTCDate());

    const [category, setCategory] = useState('Select a category');

    const [selected, setSelected] = useState(false);

    useEffect(()=>{

    }, [selected]);

    if (props.type == InputType.number) {
        return (
            <>
                <div className="column">
                    <label>{props.label}</label>
                    <input type={props.type.toString()} value={number} onChange={e => setNumber(e.target.value)} />
                </div>
            </>
        )
    }

    if (props.type == InputType.date) {
        return (
            <>
                <div className="column">
                    <label>Year</label>
                    <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value))} />
                </div>
                <div className="column">
                    <label>Month</label>
                    <input type="number" value={month+1} onChange={e => setMonth(parseInt(e.target.value))} />
                </div>
                <div className="column">
                    <label>Day</label>
                    <input type="number" value={day} onChange={e => setDay(parseInt(e.target.value))} />
                </div>
            </>
        )
    }

    if (props.type == InputType.select) {
        return (
            <>
                <label>Category</label>
                <input readOnly type="text" onClick={(e) => { setSelected(!selected) }} value={category} />
                <div className={`column column-center ${selected ? "" : "hidden"}`} style={{ width: "98%"}}>
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
        <div style={{ width: "100%"}} className="column">
            <label>{props.label}</label>
            <input type={props.type.toString()} value={props.defaultValue} onChange={(e) => { props.setDefaultValue(e.target.value)}}/>
        </div>
    </>);
}