import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { WelcomeSectionComponent } from './pages/start-page/welcome-section/welcome-section.component';
import { ENumbersComponent } from './pages/e-numbers/e-numbers.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { FooterComponent } from './footer/footer.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRecipeComponent } from './pages/recipes/add-recipe/add-recipe.component';
import { FormsModule, NgForm } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    WelcomeSectionComponent,
    FooterComponent,
    ENumbersComponent,
    StartPageComponent,
    RecipesComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
