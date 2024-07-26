import { Colours } from '../../models/Colours';
import './Card.css';

interface Props {
    colour: Colours;
    text: String;
    label: String;
}

export const Card = (props: Props) => {
    return (
        <div className={`card ${props.colour}`}>
            <h1 className="total-user-month">
                {props.text}
            </h1>
            <label className="user-name">
                {props.label}
            </label>
        </div>
    );
} 
