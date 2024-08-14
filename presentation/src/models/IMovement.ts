import { ICategory } from "./ICategory";
import { IUser } from "./IUser";

export interface IMovement {
    id: number;
    value: number;
    userShare: number;
    description: string;
    user: IUser;
    category: ICategory;
    createdOn: string;
}