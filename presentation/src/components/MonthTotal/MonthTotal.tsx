import './MonthTotal.css';

interface Props {
    month: number,
    total: number
}

export const MonthTotal = (props: Props) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (<>
        <div className='column column-center'>
            <div className="total">
                <h1 className="total-monthly">{props.total.toFixed(2)}€</h1>
            </div>
            <label className='total-month'>Total - {months[props.month - 1]}</label>
        </div>
    </>);
}