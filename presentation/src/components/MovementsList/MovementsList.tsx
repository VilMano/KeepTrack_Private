import { useEffect } from "react";
import { IUser } from "../../models/IUser";

interface Props {
    userMovements: IUser;
}

export const MovementsList = (props: Props) => {
    const movements = props.userMovements.movements;

    useEffect(() => {
    }, []);

    return (<>
        <p>{props.userMovements.name}</p>
        {movements &&
            movements.map((movement) => {
                return (<>
                <p>{movement.description}</p>
                <p>{movement.value}</p>
                <p>{movement.userShare}</p>
                </>)
            })}
    </>);
}