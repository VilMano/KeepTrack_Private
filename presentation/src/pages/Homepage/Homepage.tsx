import './Homepage.css';

import { Fragment } from "react/jsx-runtime";
import Debts from "../../components/Debts/Debts";
import UserMovements from "../../components/UserMovements/UserMovements";
import { Path } from "../../ui/Path/Path";

export const HomePage = () => {
    return (
        <Fragment>
            <div className="container">
                <Path path={'Home'}></Path>
                <Debts></Debts>
                <UserMovements></UserMovements>
            </div>
        </Fragment>);
};