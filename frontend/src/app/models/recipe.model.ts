import { RecipeType } from "./recipe-type.model";

export class Recipe {

    _id: string;
    name: string;
    description: string;
    type: RecipeType;

    constructor() { }

}