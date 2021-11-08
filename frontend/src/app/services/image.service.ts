import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  SERVER_URL: string = 'https://localhost:3000';

  constructor(private httpClient: HttpClient ) { }

  public upload(formData: FormData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
