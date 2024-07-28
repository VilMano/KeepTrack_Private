import { Colours } from '../../models/Colours';
import './Card.css';

interface Props {
    colour: Colours;
    text: string;
    label: string;
    middleLabel: number;
    pos: boolean;
}


export const Card = (props: Props) => {
    const midLabel = (<p className='personal-debt personal-debt'>- {props.middleLabel}€</p>)
    const midLabelAlt = (<p className='personal-debt personal-debt-pos'>+ {props.middleLabel}€</p>)

    const label = props.pos ? midLabel : midLabelAlt;

    return (
        <div className={`card ${props.colour}`}>
            { label }
            <h1 className="total-user-month">
                {props.text}
            </h1>
            <label className="user-name">
                {props.label}
            </label>
        </div>
    );
} 
