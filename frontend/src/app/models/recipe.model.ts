import { Instruction } from "./instruction.model";
import { Tag } from "./tag.model";

export class Recipe {

    _id: string;
    name: string;
    description: string;
    type: string;
    published: boolean;
    instructions: Instruction[]
    images: string[];
    tags: Tag[];

    constructor() { }

}

