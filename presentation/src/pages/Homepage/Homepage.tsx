import './Homepage.css';

import { Fragment } from "react/jsx-runtime";
import Debts from "../../components/Debts/Debts";
import UserMovements from "../../components/UserMovements/UserMovements";
import { Path } from "../../ui/Path/Path";
import { MonthTotal } from '../../components/MonthTotal/MonthTotal';
import { Card } from '../../ui/Card/Card';
import { Colours } from '../../models/Colours';
import { GET_MONTHLY_DEBTS_BY_USER, GET_MONTHLY_MOVEMENTS_BY_USER } from '../../api/graphql/queries/query';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IDebt } from '../../models/Debt';
import { IUser } from '../../models/IUser';
import { Debt } from '../../components/Debt/Debt';
import { IMovement } from '../../models/IMovement';

export const HomePage = () => {

    const [total, setTotal] = useState(0);
    const [debts, setDebts] = useState<IDebt[]>();
    const [debt, setDebt] = useState<number>();

    let date = new Date();
    let month = date.getMonth() +1;
    const { refetch } = useQuery(GET_MONTHLY_MOVEMENTS_BY_USER, {
        variables: {
            month: month
        }
    });

    const [users, setUsers] = useState<IUser[]>();

    useEffect(() => {
        const getMovements = async () => {
            let d = await refetch();
            setUsers(d.data.monthlyMovementsByUser)
            setTotal(0);

            if (users) {
                let debts: IDebt[] = [];

                // set each user's debt to each other
                debts.push({
                    userName: users![0].name,
                    value: users![0].debt! - users![1].debt! < 0 ? 0 : users![0].debt! - users![1].debt!
                });

                debts.push({
                    userName: users![1].name,
                    value: users![1].debt! - users![0].debt! < 0 ? 0 : users![1].debt! - users![0].debt!
                });

                setDebts(debts);
                
                // set sum of the movements
                users![0].movements.forEach((movement: IMovement) => {
                    setTotal((total) => total + movement.value)
                });

                users![1].movements.forEach((movement: IMovement) => {
                    setTotal((total) => total + movement.value)
                });

                setDebt(debts![0].value > debts![1].value ? debts![0].value - debts![1].value : debts![1].value - debts![0].value);
            }

        }

        getMovements();
    }, [users]);



    return (
        <Fragment>
            <div style={{ paddingTop: "8rem" }} className="container">
                <MonthTotal total={total} month={month}></MonthTotal>
                <div style={{ paddingTop: "4rem" }} className="row">
                    {debts && (
                        <>
                            <Debt debt={debt!} positive={debts![1].value < debts![0].value} username={debts![0].userName} totalUserAmount={users![0].movements.reduce((total, currentItem) => (total = total + currentItem.value),0,)}></Debt>
                            <Debt debt={debt!} positive={debts![0].value < debts![1].value} username={debts![1].userName} totalUserAmount={users![1].movements.reduce((total, currentItem) => (total = total + currentItem.value),0,)}></Debt>
                        </>
                    )}
                </div>
                <div className="months">

                </div>
                <div style={{ overflow: "scroll", height: "50vh", width: "100%" }} className='scrollable'>
                    <UserMovements></UserMovements>
                </div>
            </div>
        </Fragment>);
};