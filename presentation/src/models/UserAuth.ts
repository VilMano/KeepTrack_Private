import { IUser } from "./IUser";
import { User } from "./User";


export class UserAuth {
    user: IUser;
    token: string;
    isAuthenticated: boolean;

    constructor() {
        this.user = new User();
        this.token = "";
        this.isAuthenticated = false;
    }
}