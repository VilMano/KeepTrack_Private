import { InputType } from "../../models/InputType";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Fragment } from "react/jsx-runtime";
import './Insert.css';
import { useEffect, useState } from "react";
import { getUserInfo } from "../../auth/utils";
import { IMovement } from "../../models/IMovement";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_MOVEMENT } from "../../api/graphql/mutations/mutation";
import { GET_CATEGORIES } from "../../api/graphql/queries/query";
import { ICategory } from "../../models/ICategory";
import { Bounce, ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {

}

export const Insert = (props: Props) => {

    const user = getUserInfo();
    const [createMovevement, { data, loading, error }] = useMutation(CREATE_MOVEMENT);
    const [getCategories] = useLazyQuery(GET_CATEGORIES);

    const [description, setDescription] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [yourShare, setYourShare] = useState(0);
    const [dateCreated, setDateCreated] = useState('');
    const [category, setCategory] = useState('');

    const [categories, setCategories] = useState<ICategory[]>();

    
    useEffect(() => {
        const getCategoriesData = async () => {
            const data = await getCategories();
            setCategories(data.data.categories)
        };

        getCategoriesData();
    }, []);

    const handleCreateMovement = async () => {
        const data = await getCategories();
        const categories: ICategory[] = data.data.categories;
        let categoryId = 8;

        categories.map((categoryItem: ICategory) => {
            categoryId = categoryItem.name.toLowerCase().trim() == category.toLowerCase().trim() ? categoryItem.id : categoryId;
        });


        let output = await createMovevement({
            variables: {
                movement: {
                    id: 0,
                    description,
                    value: totalCost,
                    userShare: yourShare,
                    createdOn: dateCreated,
                    shared: true,
                    userId: user.id,
                    categoryId
                }
            }
        });


        if (output.data.createMovement.id * 0 == 0) {
            toast("Movement created")
        }

    }

    const handleSetTotalShare = (total: number) => {
        setTotalCost(total)
        setYourShare(total / 2);
    }

    return (
        <Fragment>
            <div className="container" style={{ paddingTop: "8rem" }}>
                <div style={{ width: "100%" }} className="row row-center">
                    <Input type={InputType.text} setDefaultValue={setDescription} defaultValue={description} label={'Description'}></Input>
                </div>
                <div style={{ width: "100%" }} className="row row-center">
                    <Input type={InputType.number} label={'Total cost'} setDefaultValue={handleSetTotalShare} defaultValue={totalCost}></Input>
                    <Input type={InputType.number} label={'Your share'} setDefaultValue={setYourShare} defaultValue={yourShare}></Input>
                </div>
                <div style={{ width: "100%" }} className="row row-center">
                    <Input type={InputType.date} label={'Date created'} defaultValue={dateCreated} setDefaultValue={setDateCreated}></Input>
                </div>
                <div style={{ width: "100%", padding: "1rem" }} className="column column-center">
                    <Input type={InputType.select} label={'Category'} setDefaultValue={setCategory} categories={categories}></Input>
                </div>
                <div style={{ width: "100%" }} className="row row-center">
                    <Button onClick={handleCreateMovement} text='Create'></Button>
                </div>
                <div>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={true}  
                        theme="dark"
                    />
                </div>
            </div>
        </Fragment>);
}