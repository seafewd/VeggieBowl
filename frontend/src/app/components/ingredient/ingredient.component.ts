import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  hasQuery: Boolean = false;

  constructor(private ingredientService: IngredientService) { }

  ingredients: Array<Ingredient> = [];

  ngOnInit(): void {
  }

  sendData(event: any) {
    const query: string = event.target.value;
    // will match if query is nothing or is only spaces
    const matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.ingredients = [];
      this.hasQuery = false;
      return;
    }
    this.ingredientService.searchIngredients(query.trim()).subscribe((results) => {
      this.ingredients = results;
      this.hasQuery = true;
    });
  }

}
