import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private webRequestService: WebRequestService) { }

    getRecipes() {
      return this.webRequestService.get('recipes');
    }

    createRecipe(title: string) {
      console.log("service creating recipe")
      return this.webRequestService.post('recipes', { title });
    }

    updateRecipe(id: string, name: string) {
      return this.webRequestService.patch(`recipes/${id}`, { name });
    }

    deleteRecipe(id: string) {
      return this.webRequestService.delete(`recipes/${id}`);
    }
  
}
