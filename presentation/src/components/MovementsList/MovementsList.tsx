import { useEffect } from "react";
import { IUser } from "../../models/IUser";
import Movement from "../Movement/Movement";
import { IMovement } from "../../models/IMovement";

interface Props {
    allMovements: IMovement[];
}

export const MovementsList = (props: Props) => {
    const movements = props.allMovements;

    useEffect(() => {
    }, []);

    return (<>
        {movements &&
            movements.map((movement: IMovement) => {
                return (<>
                    <div className="row">
                        <Movement userName={movement.user.name} movement={movement}></Movement>
                    </div>
                </>)
            })}
    </>);
}