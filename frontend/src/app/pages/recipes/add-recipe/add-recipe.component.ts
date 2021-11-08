import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private notificationService: NotificationService,
    private router: Router) { }

    selectedRecipeType: string;

    options = [
        { name: "Breakfast", value: "breakfast" },
        { name: "Lunch", value: "lunch" },
        { name: "Dinner", value: "dinner" },
        { name: "Snack", value: "snack" },
        { name: "Brunch", value: "brunch" },
        { name: "Other", value: "other" }
    ]

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid)
      return;
    const data = JSON.stringify(form.value);
    this.recipeService.createRecipe(data).subscribe((recipe: any) => {
      this.router.navigateByUrl(`/recipes/${recipe._id}`);
      this.notificationService.show("Recipe created!");
      console.log(recipe);
    })
  }

  processFile(imageInput: any) {

  }
}
