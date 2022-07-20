import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageData } from '../models/imageData';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment.prod'
import { any } from 'cypress/types/bluebird';




@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor(private http: HttpClient) { }

    // url: string = 'http://localhost:8080/TrailMates/image/' 
    url: string = 'https://revature.trailmates.net/TrailMates/image/' 

    // getImagebyId(id: string): Observable<ImageData>{
    //   return this.http.get<ImageData>(this.url+id);
    // }

    saveImg(imageReq: any): Observable<ImageData>{
      return this.http.post<ImageData>(this.url, imageReq);
    }

    uploadFile(file: File) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: 'us-east-1'
      }
    );
    const params = {
      Bucket: 'trailmates-images',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
        }
        console.log('Successfully uploaded file.', data);
        return true;
    });
}

    getLatestProfilePic(user_id: string): Observable<ImageData>{
      return this.http.get<ImageData>(this.url+'profpic/'+user_id);
    }



}
