import { useEffect } from "react";
import { IUser } from "../../models/IUser";
import Movement from "../Movement/Movement";
import { IMovement } from "../../models/IMovement";

interface Props {
    userMovements: IUser;
}

export const MovementsList = (props: Props) => {
    const movements = props.userMovements.movements;

    useEffect(() => {
    }, []);

    return (<>
        {movements &&
            movements.map((movement: IMovement) => {
                return (<>
                    <div className="row">
                        <Movement userName={props.userMovements.name} movement={movement}></Movement>
                    </div>
                </>)
            })}
    </>);
}