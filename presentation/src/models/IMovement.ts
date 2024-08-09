import { IUser } from "./IUser";

export interface IMovement {
    id: number;
    value: number;
    userShare: number;
    description: string;
    user: IUser;
    createdOn: string;
}