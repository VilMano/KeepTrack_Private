import { IMovement } from "./IMovement";

export class User {
    id: string;
    name: string;
    movements: IMovement[];

    constructor() {
        this.id = "";
        this.name = "";
        this.movements = [];
    }
}
