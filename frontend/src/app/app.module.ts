import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ViewRecipeComponent } from './pages/recipes/view-recipe/view-recipe.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { InstructionComponent } from './pages/recipes/add-recipe/instruction/instruction.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    WelcomeSectionComponent,
    FooterComponent,
    ENumbersComponent,
    StartPageComponent,
    RecipesComponent,
    AddRecipeComponent,
    ViewRecipeComponent,
    NotificationComponent,
    ContactComponent,
    AboutComponent,
    ContributeComponent,
    InstructionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
