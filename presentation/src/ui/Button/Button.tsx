import './Button.css';

interface Props {
    text: String;
}

export const Button = (props: Props) => {

    return <>
        <input type="button" className="create-button" value={props.text.toString()} />
    </>;
}