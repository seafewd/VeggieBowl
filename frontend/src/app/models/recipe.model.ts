import { Instruction } from "./instruction.model";

export class Recipe {

    _id: string;
    name: string;
    description: string;
    type: string;
    published: boolean;
    instructions: Instruction[]
    images: string[];

    constructor() { }

}