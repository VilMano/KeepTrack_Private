import { InputType } from "../../models/InputType";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Fragment } from "react/jsx-runtime";
import './Insert.css';

interface Props {

}

export const Insert = (props: Props) => {

    return (
        <Fragment>
            <div className="container" style={{ paddingTop: "8rem" }}>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.text} label={'Description'}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.number} label={'Total cost'}></Input>
                    <Input type={InputType.number} label={'Your share'}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.date} label={'Date created'}></Input>
                </div>
                <div style={{ width: "100%", padding: "1rem"}} className="column column-center">
                    <Input type={InputType.select} label={'Category'} categories={["Home decoration", "Power & Water", "Car", "Food"]}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Button text='Create'></Button>
                </div>
            </div>
        </Fragment>);
}