import './Homepage.css';

import { Fragment } from "react/jsx-runtime";
import Debts from "../../components/Debts/Debts";
import UserMovements from "../../components/UserMovements/UserMovements";
import { Path } from "../../ui/Path/Path";
import { MonthTotal } from '../../components/MonthTotal/MonthTotal';
import { Card } from '../../ui/Card/Card';
import { Colours } from '../../models/Colours';
import { GET_MONTHLY_DEBTS_BY_USER } from '../../api/graphql/queries/query';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IDebt } from '../../models/Debt';

export const HomePage = () => {
    let date = new Date();
    let month = date.getMonth();

    const [debts, setDebts] = useState<IDebt[]>();
    const { loading, error, data, refetch } = useQuery(GET_MONTHLY_DEBTS_BY_USER, {
        variables: {
            month: month
        }
    });

    useEffect(() => {
        const getDebts = async () => {
            let d = await refetch();
            setDebts(d.data.monthlyDebtByUser)
        }

        getDebts();
    }, [debts]);


    return (
        <Fragment>
            <div style={{ paddingTop: "8rem" }} className="container">
                {/* <Path path={'Home'}></Path> */}
                <MonthTotal total={607.11} month={7}></MonthTotal>
                <Debts></Debts>
                <UserMovements></UserMovements>
            </div>
        </Fragment>);
};