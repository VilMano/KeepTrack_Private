import { InputType } from '../../models/InputType';
import './Input.css';

interface Props {
    label: String;
    type: InputType;
}

export const Input = (props: Props) => {

    if (props.type == InputType.number) {
        return (
            <>
                <div className="column">
                    <label>{props.label}</label>
                    <input type={props.type.toString()} />
                </div>
            </>
        )
    }

    return (<>
        <div className="column">
            <label>{props.label}</label>
            <input type={props.type.toString()} />
        </div>
    </>);
}