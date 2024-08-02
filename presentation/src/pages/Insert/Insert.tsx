import { InputType } from "../../models/InputType";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Fragment } from "react/jsx-runtime";
import './Insert.css';
import { useState } from "react";

interface Props {

}

export const Insert = (props: Props) => {

    const [ description, setDescription ] = useState('');
    const [ totalCost, setTotalCost ] = useState(0);
    const [ yourShare, setYourShare ] = useState(0);
    const [ dateCreated, setDateCreated ] = useState('');
    const [ category, setCategory ] = useState('');


    return (
        <Fragment>
            <div className="container" style={{ paddingTop: "8rem" }}>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.text} setDefaultValue={setDescription} defaultValue={description} label={'Description'}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.number} label={'Total cost'} setDefaultValue={setTotalCost} defaultValue={totalCost}></Input>
                    <Input type={InputType.number} label={'Your share'} setDefaultValue={setYourShare} defaultValue={yourShare}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.date} label={'Date created'} defaultValue={dateCreated} setDefaultValue={setDateCreated}></Input>
                </div>
                <div style={{ width: "100%", padding: "1rem"}} className="column column-center">
                    <Input type={InputType.select} label={'Category'} setDefaultValue={setCategory} categories={["Home decoration", "Power & Water", "Car", "Food"]}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Button onClick={() => {  ('Creating movement') }} text='Create'></Button>
                </div>
            </div>
        </Fragment>);
}