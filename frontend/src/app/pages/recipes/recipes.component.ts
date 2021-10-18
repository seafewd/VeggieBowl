import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes?: Recipe[];
  
  constructor(private recipeService: RecipeService) { }

  // TODO FIX
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes: any) => {
      this.recipes = recipes;
    }) 
  }

  createNewRecipe() {
    this.recipeService.createRecipe('Testing').subscribe((response: any) => {
      console.log("recipe created");
      console.log(response);
    })
  }

}
