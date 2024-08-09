import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MONTHLY_MOVEMENTS_BY_USER } from "../../api/graphql/queries/query";
import { IUser } from "../../models/IUser";
import { MovementsList } from "../MovementsList/MovementsList";
import { IMovement } from "../../models/IMovement";


export const UserMovements = () => {
  let date = new Date();
  let month = date.getMonth();
  const { loading, error, data, refetch } = useQuery(GET_MONTHLY_MOVEMENTS_BY_USER, {
    variables: {
      month: month
    }
  });

  const [movements, setMovements] = useState<IMovement[]>();

  useEffect(() => {
    const getMovements = async () => {
      let d = await refetch();
      console.log(d.data.monthlyMovementsByUser);

      const movementsList: IMovement[] = d.data.monthlyMovementsByUser[0].movements.concat(d.data.monthlyMovementsByUser[1].movements);

      var sortedData = movementsList.sort((a: any, b: any) => {
        console.log(a, b)
        return new Date(a.createdOn).getDate() -
          new Date(b.createdOn).getDate()
      }).reverse();

      setMovements(sortedData)
    }

    getMovements();
  }, []);

  console.log(movements)

  return (
    <>
      {movements && (<MovementsList allMovements={movements}></MovementsList>)}
    </>
  );
}

export default UserMovements;
