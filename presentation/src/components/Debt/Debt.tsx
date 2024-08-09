import { Colours } from "../../models/Colours";
import { IDebt } from "../../models/Debt"
import { Card } from "../../ui/Card/Card";

interface Props {
    totalUserAmount: number;
    username: string;
    positive: boolean;
    debt: number;
}

export function Debt(props: Props) {
    return (
        <>
            <Card pos={props.positive} middleLabel={props.debt} label={props.username} text={`${props.totalUserAmount}€`} colour={Colours.neutral}></Card>
        </>
    )
}