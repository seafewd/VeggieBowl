import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Instruction } from 'src/app/models/instruction.model';
import { InstructionService } from 'src/app/services/instruction.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  @ViewChild('instructionInput') instructionInput: ElementRef;

  constructor() { }

  instructions: Instruction[] = [];

  ngOnInit(): void {
  }

  public getInstructions() {
    return this.instructions;
  }

  drop(event: CdkDragDrop<Instruction[]>) {
    moveItemInArray(this.instructions, event.previousIndex, event.currentIndex);
  }

  onDeleteInstructionClick(instruction: Instruction) {
    this.instructions.splice(this.instructions.indexOf(instruction), 1);
  }

  onAddInstructionClick() {
    const newInstruction = new Instruction();
    this.instructions.push(newInstruction);
  }

  saveInstructionText(instruction: Instruction) {
    const text = this.instructionInput.nativeElement.value;
    console.log(text)
    instruction.text = text;
    console.log(instruction.text)
  }

}
