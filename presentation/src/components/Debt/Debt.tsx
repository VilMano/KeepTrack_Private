import { Colours } from "../../models/Colours";
import { IDebt } from "../../models/Debt"
import { Card } from "../../ui/Card/Card";

interface Props {
    debt: IDebt;
}

export function Debt(props: Props) {
    console.log("Debts: ", props.debt)

    return (
        <>
            <Card label={props.debt.userName} text={`${props.debt.value}€`} colour={Colours.neutral}></Card>
        </>
    )
}