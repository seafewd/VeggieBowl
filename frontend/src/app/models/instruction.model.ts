export class Instruction {
    _id: string;
    text: string;
    order: number;
    completed: boolean;

    constructor(text: string) {
        this.text = text;
    }
}