import { Colours } from '../../models/Colours';
import './Cards.css';

interface Props {
    children: React.ReactNode;
    color: Colours;
}

export const Card = (props: Props) => {
    return (
        <div className={`card ${props.color}`}>
            {props.children}
        </div>
    );
} 
