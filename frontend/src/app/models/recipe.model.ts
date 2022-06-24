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
    createdAt: Date;
    updatedAt: Date;

    constructor() { }

    get creationDate() : string {
        let year = this.createdAt.getFullYear;
        let month = this.createdAt.getMonth;
        let day = this.createdAt.getDay;
        console.log("shortdate")
        return  year + "-" + month + "-" + day; 
    }

}

