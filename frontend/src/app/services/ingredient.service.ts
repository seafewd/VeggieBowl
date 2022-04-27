import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { map, tap } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private webRequestService: WebRequestService, private httpClient: HttpClient) { }

  searchIngredients(query: string) {
    // return this.webRequestService.post<{payload: Array<Ingredient>}>('ingredients', {payload: query}
    // ).pipe(map(data => data.payload))
    
    // todo fix dis ugly shit
    //return this.httpClient.post<{payload: Array<Ingredient>}>('http://localhost:3000/ingredients', {payload: query} local variant
    return this.httpClient.post<{payload: Array<Ingredient>}>('ingredients', {payload: query}
    ).pipe(map(data => data.payload))
  }
}
