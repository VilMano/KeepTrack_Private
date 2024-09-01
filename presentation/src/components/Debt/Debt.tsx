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
            <Card pos={props.positive} topText={props.debt} bottomText={props.username} mainText={`${props.totalUserAmount.toFixed(2)}€`} colour={Colours.neutral}></Card>
        </>
    )
}