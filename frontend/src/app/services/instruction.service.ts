import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  constructor(private webRequestService: WebRequestService) { }

  deleteInstruction(id: string) {
    this.webRequestService.delete(`recipes/${id}`);
  }
}
