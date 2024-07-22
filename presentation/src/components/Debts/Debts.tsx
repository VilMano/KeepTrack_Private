import { useEffect, useState } from "react";
import { Debt } from "../Debt/Debt";
import { useQuery } from "@apollo/client";
import { GET_MONTHLY_DEBTS_BY_USER } from "../../api/graphql/queries/query";
import { IDebt } from "../../models/Debt";

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
      let a = await refetch();
      setDebts(a.data.monthlyDebtByUser)
    }

    getDebts();
  }, [debts]);
  
  return (
    <>
      {debts && debts.map((debt: IDebt) => {
        return (<Debt debt={debt}></Debt>)
      })}
    </>
  );
}

export default Debts;
