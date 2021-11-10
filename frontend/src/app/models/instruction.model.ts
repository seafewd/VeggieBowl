export class Instruction {
    _id: string;
    text: string;
    completed: boolean;

    constructor(text: string = "") {
        this.text = text;
    }
    
}