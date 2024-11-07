import { useEffect, useState } from "react";
import { Debt } from "../Debt/Debt";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MONTHLY_DEBTS_BY_USER } from "../../api/graphql/queries/query";
import { IDebt } from "../../models/Debt";
import { send } from "process";
import './Movement.css';
import { IMovement } from "../../models/IMovement";
import { Button } from "../../ui/Button/Button";
import { DeleteButton } from "../../ui/DeleteButton/DeleteButton";
import { DELETE_MOVEMENT } from "../../api/graphql/mutations/mutation";

interface Props {
  movement: IMovement;
  userName: string;
}

export const Movement = (props: Props) => {
  const [deleteMovement] = useMutation(DELETE_MOVEMENT);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {

  }, [isOpened]);

  const handleMovementClick = (e: any) => {
    setIsOpened(current => !current);
  };

  const handleOnSave = () => {

  }

  const handleOnEdit = () => {
    setIsEdit(true);
  }

  const handleOnDelete = async () => {
    await deleteMovement({
      variables: {
        id: props.movement.id
      }
    })

    window.location.reload();
  }


  return (
    <>
      <div className="movement">
        <div className="row" onClick={handleMovementClick} style={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <div className="column">
            {isEdit ? (
              <>
                <input style={{ height: "2rem" }} className="description" value={props.movement.description}></input>
                <input className="username" style={{ fontSize: ".9rem", height: "2rem" }} value={props.userName}></input>
                <input style={{ height: "2rem" }} className="date" value={props.movement.createdOn.split('T')[0]}></input>
                <input style={{ height: "2rem" }} className="cat" value={props.movement.category.name}></input>
              </>
            ) : (<>
              <p className="description">{props.movement.description}</p>
              <p className="username" style={{ fontSize: ".9rem" }}>{props.userName}</p>
              <label className="date">{props.movement.createdOn.split('T')[0]}</label>
              <label className="cat">{props.movement.category.name}</label>
            </>)}
          </div>
          <div className="column">
            {isEdit ? 
            (<><input className="value" value={`-${props.movement.value.toFixed(2)}€`}></input></>) 
            : 
            (<><p className="value">-{props.movement.value.toFixed(2)}€</p></>)
            }

          </div>
        </div>
        <div className={`row bottom-menu ${isOpened ? "show" : "hide"}`}>
          <div className="buttons">
            {isEdit && (<Button text="Save" onClick={handleOnSave}></Button>)}
            <Button className="edit-btn" text="" onClick={handleOnEdit}></Button>
            <DeleteButton deleteFunction={handleOnDelete}></DeleteButton>
          </div>

        </div>
      </div>
    </>
  );
}

export default Movement;
