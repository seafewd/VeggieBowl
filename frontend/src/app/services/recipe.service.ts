import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private webRequestService: WebRequestService) { }

    getRecipes() {
      return this.webRequestService.get('recipes');
    }

    getRecipe(id: string) {
      return this.webRequestService.get(`recipes/${id}`);
    }

    createRecipe(form: string) {
      return this.webRequestService.post('recipes', { form });
    }

    updateRecipe(id: string, title: string) {
      return this.webRequestService.patch(`recipes/${id}`, { title });
    }

    deleteRecipe(id: string) {
      return this.webRequestService.delete(`recipes/${id}`);
    }
  
}
