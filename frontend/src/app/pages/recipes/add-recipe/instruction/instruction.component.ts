import { Component, OnInit } from '@angular/core';
import { Instruction } from 'src/app/models/instruction.model';
import { InstructionService } from 'src/app/services/instruction.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  constructor(private instructionService: InstructionService) { }

  instructions: Instruction[] = [
    new Instruction("test1"),
    new Instruction("test2"),
    new Instruction("test3"),
  ];
  
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.instructions, event.previousIndex, event.currentIndex);
  }

  onDeleteInstructionClick(id: string) {
    this.instructionService.deleteInstruction(id);
  }

}
