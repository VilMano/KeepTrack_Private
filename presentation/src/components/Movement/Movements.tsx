import { useEffect, useState } from "react";
import { Debt } from "../Debt/Debt";
import { useQuery } from "@apollo/client";
import { GET_MONTHLY_DEBTS_BY_USER } from "../../api/graphql/queries/query";
import { IDebt } from "../../models/Debt";
import { send } from "process";

export const Movement = (movement: any) => {
  useEffect(() => {
  }, []);

  return (
    <>
        <p>{movement.name}</p>      
        <p>{movement.value}</p>      
        <p>{movement.userShare}</p>      
    </>
  );
}

export default Movement;
