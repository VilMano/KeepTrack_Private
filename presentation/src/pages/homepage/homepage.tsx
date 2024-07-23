import { Fragment } from "react/jsx-runtime";
import Debts from "../../components/Debts/Debts";
import UserMovements from "../../components/UserMovements/UserMovements";

export const HomePage = () => {
    return (
        <Fragment>
            <Debts></Debts>
            <UserMovements></UserMovements>
        </Fragment>);
};