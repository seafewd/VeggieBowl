import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    console.log('Submitted');
  }
}
