import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];
  form: NgForm;
  
  constructor(private recipeService: RecipeService) { }
  
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes: any) => {
      this.recipes = recipes;
    });
  }

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id);
  }

  truncateText(text: string, maxLength: number) {
    if (text.length > maxLength)
      text = text.substring(0, maxLength - 3) + "...";
    return text;
  }

}
