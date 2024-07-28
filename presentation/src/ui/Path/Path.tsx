import './Path.css';

interface Props {
    path: String;
}

export const Path = (props: Props) => {
    var path = Array.from(props.path.toLowerCase());
    path[0] = path[0].toUpperCase();

    return (
        <div className="row">
            <div className="bullet"></div>
            <h1>{path}</h1>
        </div>);
}