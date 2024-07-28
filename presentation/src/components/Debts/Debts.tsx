import { useEffect, useState } from "react";
import { Debt } from "../Debt/Debt";
import { useQuery } from "@apollo/client";
import { GET_MONTHLY_DEBTS_BY_USER } from "../../api/graphql/queries/query";
import { IDebt } from "../../models/Debt";
import { send } from "process";

export const Debts = () => {
  let date = new Date();
  let month = date.getMonth();
  const { loading, error, data, refetch } = useQuery(GET_MONTHLY_DEBTS_BY_USER, {
    variables: {
      month: month
    }
  });

  const [debts, setDebts] = useState<IDebt[]>();

  useEffect(() => {
    const getDebts = async () => {
      let d = await refetch();
      setDebts(d.data.monthlyDebtByUser)
    }

    getDebts();
  }, [debts]);


  var sender = "";
  var amount = 0;
  var reciever = "";

  if (debts) {
    if (debts[0].value > debts[1].value) {
      sender = debts[0].userName;
      amount = debts[0].value - debts[1].value;
      reciever = debts[1].userName;
    }

    if (debts[1].value > debts[0].value) {
      sender = debts[1].userName;
      amount = debts[1].value - debts[0].value;
      reciever = debts[0].userName;
    }
  }

  return (
    <>
      <div style={{ paddingTop: "4rem"}} className="row">
        {debts && debts.map((debt: IDebt) => {
          const positive = debt.userName.toLowerCase() == sender.toLowerCase();
          return (<Debt positive={positive} transfer={amount} debt={debt}></Debt>)
        })}
      </div>
    </>
  );
}

export default Debts;
