import { Colours } from "../../models/Colours";
import { IDebt } from "../../models/Debt"
import { Card } from "../../ui/Card/Card";

interface Props {
    debt: IDebt;
    transfer: number;
    positive: boolean;
}

export function Debt(props: Props) {
    return (
        <>
            <Card pos={props.positive} middleLabel={props.transfer} label={props.debt.userName} text={`${props.debt.value}€`} colour={Colours.neutral}></Card>
        </>
    )
}