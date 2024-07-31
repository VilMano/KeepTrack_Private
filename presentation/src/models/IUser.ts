import { IMovement } from "./IMovement";

export interface IUser {
    id: string;
    name: string;
    movements: IMovement[];
}