import { IMovement } from "./IMovement";

export interface IUser {
    id: string;
    name: string;
    debt?: number;
    movements: IMovement[];
}