import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { InstructionComponent } from './instruction/instruction.component';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  @ViewChild(ImageUploadComponent) iuc: ImageUploadComponent;

  constructor(
    private recipeService: RecipeService,
    private notificationService: NotificationService,
    private router: Router) 
    {
      
    }

    // recipe types
    selectedRecipeType: string;
    options = [
        { name: "Breakfast", value: "breakfast" },
        { name: "Lunch", value: "lunch" },
        { name: "Dinner", value: "dinner" },
        { name: "Snack", value: "snack" },
        { name: "Brunch", value: "brunch" },
        { name: "Other", value: "other" }
    ]

    instructions: InstructionComponent[];

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    const imagePaths = this.iuc.getImagePaths();
    if (!form.valid)
      return;

    form.controls['images'].setValue(imagePaths);
    const data = JSON.stringify(form.value);

    this.recipeService.createRecipe(data).subscribe((recipe: any) => {
      this.router.navigateByUrl(`/recipes/${recipe._id}`);
      this.notificationService.show("Recipe created!");
    });
  }
}
