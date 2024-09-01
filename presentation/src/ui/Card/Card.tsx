import { Colours } from '../../models/Colours';
import './Card.css';

interface Props {
    colour: Colours;
    mainText: string;
    bottomText: string;
    topText: number;
    pos: boolean;
}


export const Card = (props: Props) => {
    const midLabel = (<p className='personal-debt personal-debt'>- {props.topText.toFixed(2)}€</p>)
    const midLabelAlt = (<p className='personal-debt personal-debt-pos'>+ {props.topText.toFixed(2)}€</p>)

    const label = props.pos ? midLabel : midLabelAlt;

    return (
        <div className={`card ${props.colour}`}>
            { label }
            <h1 className="total-user-month">
                {props.mainText}
            </h1>
            <label className="user-name">
                {props.bottomText}
            </label>
        </div>
    );
} 
