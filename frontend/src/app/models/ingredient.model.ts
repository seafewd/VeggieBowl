export class Ingredient {
    _id: String;
    name: String;
    
    // per 100g
    kCals: Number;
    protein: Number;


    constructor(ingredientName: string) {
        this.name = ingredientName;
    }
}