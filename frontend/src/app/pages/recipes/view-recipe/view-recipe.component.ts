import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Instruction } from 'src/app/models/instruction.model';
import { Recipe } from 'src/app/models/recipe.model';
import { InstructionService } from 'src/app/services/instruction.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  recipe: Recipe;
  imagePaths: string[];
  instructions: Instruction[];
  
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private ic: InstructionService) { }
    
    ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        const id = paramMap.get('_id');
        this.recipeService.getRecipe(id as string).subscribe((recipe: any) => {
          this.recipe = recipe;
          this.imagePaths = recipe.images;
          this.instructions = recipe.instructions;
        });
    });
  }

  toggleCompleted(instruction: Instruction) {
    this.ic.updateInstruction(instruction, { completed: !instruction.completed});
  }

}
