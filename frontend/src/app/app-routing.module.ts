import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ENumbersComponent } from './pages/e-numbers/e-numbers.component';
import { AddRecipeComponent } from './pages/recipes/add-recipe/add-recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes = [
  { path: 'start-page', component: StartPageComponent },
  { path: 'e-numbers', component: ENumbersComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'add-recipe', component: AddRecipeComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
