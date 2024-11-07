import './Homepage.css';

import { Fragment } from "react/jsx-runtime";
import Debts from "../../components/Debts/Debts";
import UserMovements from "../../components/UserMovements/UserMovements";
import { Path } from "../../ui/Path/Path";
import { MonthTotal } from '../../components/MonthTotal/MonthTotal';
import { Card } from '../../ui/Card/Card';
import { Colours } from '../../models/Colours';
import { GET_MONTHLY_DEBTS_BY_USER, GET_MONTHLY_MOVEMENTS_BY_USER, GET_USER_BY_ID, GET_USERS } from '../../api/graphql/queries/query';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IDebt } from '../../models/Debt';
import { IUser } from '../../models/IUser';
import { Debt } from '../../components/Debt/Debt';
import { IMovement } from '../../models/IMovement';
import { MonthSlider } from '../../components/MonthSlider/MonthSlider';

export const HomePage = () => {
    const [total, setTotal] = useState(0);
    const [debts, setDebts] = useState<IDebt[]>();
    const [debt, setDebt] = useState<number>();

    const [totalUser1, setTotalUser1] = useState(0);
    const [totalUser2, setTotalUser2] = useState(0);


    let date = new Date();
    const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth() + 1);

    const [getMonthlyMovements] = useLazyQuery(GET_MONTHLY_MOVEMENTS_BY_USER, {
        variables: {
            month: selectedMonth
        }
    });

    const [getUsers] = useLazyQuery(GET_USERS);

    const [users, setUsers] = useState<IUser[]>();

    useEffect(() => {
        
        setDebt(0);

        const getMovements = async () => {

            let d = await getMonthlyMovements({
                variables: {
                    month: selectedMonth
                }
            });

            if (d.data) {
                let allUsers = d.data.monthlyMovementsByUser;
                setUsers(allUsers)
                setDebts([]);

                let debts: IDebt[] = [];

                // set each user's debt to each other
                debts.push({
                    userName: allUsers![0].name,
                    value: allUsers![0].debt! - allUsers![1].debt! < 0 ? 0 : allUsers![0].debt! - allUsers![1].debt!
                });

                debts.push({
                    userName: allUsers![1].name,
                    value: allUsers![1].debt! - allUsers![0].debt! < 0 ? 0 : allUsers![1].debt! - allUsers![0].debt!
                });

                setDebts(debts);
                setTotal(0);
                setTotalUser1(0);
                setTotalUser2(0);

                // I should really not be doing this
                let totalUser1tmp = 0;
                let totalUser2tmp = 0;

                // set sum of the movements
                allUsers![0].movements.forEach((movement: IMovement) => {
                    setTotal((total) => total + movement.value);
                    totalUser1tmp = totalUser1tmp + movement.userShare;
                    setTotalUser1((total) => total + movement.value);
                });

                allUsers![1].movements.forEach((movement: IMovement) => {
                    setTotal((total) => total + movement.value);
                    totalUser2tmp = totalUser2tmp + movement.userShare;
                    setTotalUser2((total) => total + movement.value);
                });


                setDebt(totalUser1tmp > totalUser2tmp ? totalUser1tmp - totalUser2tmp : totalUser2tmp - totalUser1tmp);
            } else {
                setTotal(0);
                setDebts(undefined);
                setUsers(undefined);
                setDebt(0);
            }

        }

        getMovements();
    }, [selectedMonth]);

    return (
        <Fragment>
            <div style={{ paddingTop: "8rem" }} className="container">
                <MonthTotal total={total} month={selectedMonth}></MonthTotal>
                <div style={{ paddingTop: "4rem" }} className="row">
                    {debts && (
                        <>
                            <Debt debt={debt!} positive={debts![1].value < debts![0].value} username={debts![0].userName} totalUserAmount={totalUser1}></Debt>
                            <Debt debt={debt!} positive={debts![0].value < debts![1].value} username={debts![1].userName} totalUserAmount={totalUser2}></Debt>
                        </>
                    )}
                </div>
                <div className="months">
                    <MonthSlider month={selectedMonth} setSelectedMonth={setSelectedMonth}></MonthSlider>
                </div>
                <div style={{ overflow: "scroll", height: "50vh", width: "100%" }} className='scrollable'>
                    {users && (<UserMovements users={users!} month={selectedMonth}></UserMovements>)}
                </div>
            </div>
        </Fragment>);
};