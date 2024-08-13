import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MONTHLY_MOVEMENTS_BY_USER } from "../../api/graphql/queries/query";
import { IUser } from "../../models/IUser";
import { MovementsList } from "../MovementsList/MovementsList";
import { IMovement } from "../../models/IMovement";

interface Props{
  month: number,
  users: IUser[]
}

export const UserMovements = (props: Props) => {  
  const [movements, setMovements] = useState<IMovement[]>();

  useEffect(() => {
    const getMovements = async () => {
        const movementsList: IMovement[] = props.users[0].movements.concat(props.users[1].movements);
  
        var sortedData = movementsList.sort((a: any, b: any) => {
          return new Date(a.createdOn).getDate() -
            new Date(b.createdOn).getDate()
        }).reverse();
  
        setMovements(sortedData)
    }

    getMovements();
  }, [props.users]);

  return (
    <>
      {movements && (<MovementsList allMovements={movements}></MovementsList>)}
    </>
  );
}

export default UserMovements;
