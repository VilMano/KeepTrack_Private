import { useEffect, useState } from "react";
import { Debt } from "../Debt/Debt";
import { useQuery } from "@apollo/client";
import { GET_MONTHLY_DEBTS_BY_USER } from "../../api/graphql/queries/query";
import { IDebt } from "../../models/Debt";
import { send } from "process";
import './Movement.css';
import { IMovement } from "../../models/IMovement";

interface Props{
  movement: IMovement;
  userName: string;
}

export const Movement = (props: Props) => {
  useEffect(() => {
  }, []);

  return (
    <>
      <div className="movement">
        <div className="column">
          <p className="description">{props.movement.description}</p>
          <p className="username" style={{fontSize: ".9rem"}}>{props.userName}</p>
          <label className="date">{props.movement.createdOn.split('T')[0]}</label>
          <label className="cat">{props.movement.category.name}</label>
        </div>
        <div className="column">
          <p className="value">-{props.movement.value.toFixed(2)}€</p>
        </div>
      </div>
    </>
  );
}

export default Movement;
