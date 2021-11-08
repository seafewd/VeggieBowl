import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { ENumbersComponent } from './pages/e-numbers/e-numbers.component';
import { AddRecipeComponent } from './pages/recipes/add-recipe/add-recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ViewRecipeComponent } from './pages/recipes/view-recipe/view-recipe.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes = [
  { path: '', component: StartPageComponent },
  { path: 'e-numbers', component: ENumbersComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'recipes/:_id', component: ViewRecipeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contribute', component: ContributeComponent },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
