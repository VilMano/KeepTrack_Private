import { IMovement } from "./IMovement";

export interface IUser {
    id: number;
    name: string;
    movements: IMovement[];
}