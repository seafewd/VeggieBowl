import { v4 as uuidv4 } from 'uuid';

export class Tag {
    _id: string;
    text: string;

    constructor(tagText: string) {
        this._id = uuidv4();
        this.text = tagText;
    }
}