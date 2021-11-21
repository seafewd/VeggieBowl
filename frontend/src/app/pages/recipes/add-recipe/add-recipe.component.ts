import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructionService } from 'src/app/services/instruction.service';
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
  @ViewChild(InstructionComponent) ic: InstructionComponent;

  constructor(
    private recipeService: RecipeService,
    private notificationService: NotificationService,
    private router: Router,
    private instructionService: InstructionService) { }

  options: any;

  ngOnInit(): void {
      // recipe types
    this.options = this.instructionService.getOptions();

  }

  onFormSubmit(form: NgForm) {
    const imagePaths = this.iuc.getImagePaths();
    const instructions = this.ic.getInstructions();

    if (!form.valid) return;
    // set form fields
    form.controls['instructions'].setValue(instructions);
    form.controls['images'].setValue(imagePaths);

    const data = JSON.stringify(form.value);
    console.log(data)
    this.recipeService.createRecipe(data).subscribe((recipe: any) => {
      this.router.navigateByUrl(`/recipes/${recipe._id}`);
      this.notificationService.show("Recipe created!");
    });
  }
}
