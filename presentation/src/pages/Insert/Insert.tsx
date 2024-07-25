import { InputType } from "../../models/InputType";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Fragment } from "react/jsx-runtime";

interface Props {

}

export const Insert = (props: Props) => {

    return (
        <Fragment>
            <div className="row row-center">
                <Input type={InputType.text} label={'Description'}></Input>
            </div>
            <div className="row row-center">
                <Input type={InputType.number} label={'Total cost'}></Input>
                <Input type={InputType.number} label={'Your share'}></Input>
            </div>
            <div className="row row-center">
                <Input type={InputType.select} label={'Date created'}></Input>
            </div>
            {/* <Input type={InputType.text} label={'Total cost'}></Input>
            <Input type={InputType.text} label={'Category'}></Input> */}
            <div className="row row-center">
                <Button text='Create'></Button>
            </div>

        </Fragment>);
}