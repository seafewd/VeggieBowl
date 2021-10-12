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

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    WelcomeSectionComponent,
    FooterComponent,
    ENumbersComponent,
    StartPageComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
