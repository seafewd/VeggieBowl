export class Instruction {
    _id: string;
    text: string;
    completed: boolean = false;

    constructor(text: string = "") {
        this.text = text;
    }
    
}