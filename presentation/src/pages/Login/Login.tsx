import { InputType } from "../../models/InputType";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Fragment } from "react/jsx-runtime";
import './Login.css';
import { MouseEventHandler, useCallback, useContext, useState } from "react";
import { UserContext } from "../../auth/UserContext";
import { setHeapSnapshotNearHeapLimit } from "v8";

interface Props {

}


export const Login = (props: Props) => {
    const context = useContext(UserContext);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const authenticate = async () => {
        const resp = context.login(username, password);
    }

    return (
        <Fragment>
            <div className="container" style={{ paddingTop: "8rem" }}>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.text} label={'Username'} setDefaultValue={setUsername}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Input type={InputType.password} label={'Username'} setDefaultValue={setPassword}></Input>
                </div>
                <div style={{ width: "100%"}} className="row row-center">
                    <Button text='Authenticate' onClick={authenticate}></Button>
                </div>
            </div>
        </Fragment>);
}