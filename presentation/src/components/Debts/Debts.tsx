import { Debt } from "../Debt/Debt";
import { IDebt } from "../../models/Debt";
import { useState } from "react";

interface Props{
  debts: IDebt[] | undefined
}

export const Debts = (props: Props) => {

  // .forEach(element => {
    
  // });

  // return (
  //   <>
  //     <div style={{ paddingTop: "4rem"}} className="row">
  //       {props.debts && props.debts.map((debt: IDebt) => {

  //         return (<Debt debt={props.debt} positive={true} value={debt.value} username={debt.userName}></Debt>)
  //       })}
  //     </div>
  //   </>
  // );

  return <></>
}

export default Debts;
