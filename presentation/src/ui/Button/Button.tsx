import './Button.css';

interface Props {
    text: String;
    onClick: Function;
}

export const Button = (props: Props) => {

    return <>
        <input type="button" onClick={() => {props.onClick()}} className="create-button" value={props.text.toString()} />
    </>;
}