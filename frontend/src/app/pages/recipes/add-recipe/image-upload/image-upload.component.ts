import { Component, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  images: any;
  public imagePaths: string[] = new Array();

  constructor(private imageService: ImageService) { }

  public getImagePaths(): string[] {
    return this.imagePaths;
  }

  processFiles(event: any) {
    this.images = event.target.files;
    this.imageService.uploadImages(this.images).subscribe(
      (data) => {
        const arr: any = data;
        arr.forEach((image: any) => {
          const prunedPath = image.path.replace(/\\/g, "/");
          const imagePath = this.imageService.get(prunedPath);
          this.imagePaths.push(imagePath);
        });
      },
      (error) => {
        console.error(error);
      }
      )
  }


}
