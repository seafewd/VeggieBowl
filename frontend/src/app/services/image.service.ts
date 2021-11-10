import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  SERVER_URL: string = 'https://localhost:3000';

  constructor(private httpClient: HttpClient ) { }

  uploadImage(image: File){
    const formData = new FormData();
    formData.append('image', image);
    this.httpClient.post(`${this.SERVER_URL}/api/uploads/image-upload`, formData).subscribe(
      (req) => {

      },
      (res) => {

      }
    )
  }

}
