import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private webRequestService: WebRequestService ) { }

  uploadImages(images: FileList){
    const formData = new FormData();
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      formData.append('images', image);
    }
    
    return this.webRequestService.post("files", formData);
  }

  get(uri: string) {
    return `${this.webRequestService.ROOT_URL}/${uri}`;
  }

}
