import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class InstructionService {

  options = [
    { name: "Breakfast", value: "breakfast" },
    { name: "Lunch", value: "lunch" },
    { name: "Dinner", value: "dinner" },
    { name: "Snack", value: "snack" },
    { name: "Brunch", value: "brunch" },
    { name: "Other", value: "other" }
  ]

  constructor(private webRequestService: WebRequestService) { }

  getOptions(): { name: string; value: string; }[] {
    return this.options;
  }
}
