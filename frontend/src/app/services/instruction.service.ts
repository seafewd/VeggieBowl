import { Injectable } from '@angular/core';
import { Instruction } from '../models/instruction.model';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  instructions: Instruction[] = []

  options = [
    { name: "Breakfast", value: "breakfast" },
    { name: "Lunch", value: "lunch" },
    { name: "Dinner", value: "dinner" },
    { name: "Snack", value: "snack" },
    { name: "Brunch", value: "brunch" },
    { name: "Other", value: "other" }
  ]

  constructor() { }

  getInstruction(id: string) {
    return this.instructions.find(i => i._id === id)
  }

  getOptions(): { name: string; value: string; }[] {
    return this.options;
  }

  updateInstruction(instruction: Instruction, updatedFields: Partial<Instruction>) {
    Object.assign(instruction, updatedFields);
  
  }
}
