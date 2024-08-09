import { InputType } from "../../models/InputType";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Fragment } from "react/jsx-runtime";
import './Insert.css';
import { useState } from "react";
import { getUserInfo } from "../../auth/utils";
import { IMovement } from "../../models/IMovement";
import { useMutation } from "@apollo/client";
import { CREATE_MOVEMENT } from "../../api/graphql/mutations/mutation";

interface Props {

}

export const Insert = (props: Props) => {

    const user = getUserInfo();
    const [ createMovevement, { data, loading, error }] = useMutation(CREATE_MOVEMENT);

    const [ description, setDescription ] = useState('');
    const [ totalCost, setTotalCost ] = useState(0);
    const [ yourShare, setYourShare ] = useState(0);
    const [ dateCreated, setDateCreated ] = useState('');
    const [ category, setCategory ] = useState('');

    const handleCreateMovement = () => {

        createMovevement({
            variables: {
                movement: {
                    id: 0,
                    description,
                    value: totalCost,
                    userShare: yourShare,
                    createdOn: dateCreated,
                    shared: true,
                    userId: user.id
                }
            }
        })
    }

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
                    <Button onClick={handleCreateMovement} text='Create'></Button>
                </div>
            </div>
        </Fragment>);
}