import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MONTHLY_MOVEMENTS_BY_USER } from "../../api/graphql/queries/query";
import { IUser } from "../../models/IUser";
import { MovementsList } from "../MovementsList/MovementsList";

export const UserMovements = () => {
  let date = new Date();
  let month = date.getMonth();
  const { loading, error, data, refetch } = useQuery(GET_MONTHLY_MOVEMENTS_BY_USER, {
    variables: {
      month: month
    }
  });

  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    const getMovements = async () => {
      let d = await refetch();
      setUsers(d.data.monthlyMovementsByUser)
    }

    getMovements();
  }, [users]);

  return (
    <>
      {users && users.map((user: IUser) => {
        return (<MovementsList userMovements={user}></MovementsList>)
      })}

    </>
  );
}

export default UserMovements;
