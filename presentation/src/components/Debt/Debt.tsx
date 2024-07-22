import { IDebt } from "../../models/Debt"

interface Props {
    debt: IDebt;
}

export function Debt(props: Props) {
    console.log("Debts: ", props.debt)

    return (
        <>
            <p>{props.debt.userName}</p>
            <p>{props.debt.value}</p>
        </>
    )
}