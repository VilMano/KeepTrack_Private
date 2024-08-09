import { IUser } from "./IUser";

export interface IUserAuth {
    user: IUser;
    token: string;
    isAuthenticated: boolean;
}