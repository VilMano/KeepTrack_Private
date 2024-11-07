import './Button.css';

interface Props {
    text: String;
    className?: String;
    onClick: Function;
}

export const Button = (props: Props) => {
    return <>
        <input type="button" onClick={() => {props.onClick()}} className={"create-button " + props.className} value={props.text.toString()} />
    </>;
}