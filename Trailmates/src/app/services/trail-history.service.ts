import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { TrailHistory } from '../models/trailHistory';
import { BucketURL } from '../models/bucketurl';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  // private URL="https://revature.trailmates.net/TrailMates/history";
  // private imageURL = "https://revature.trailmates.net/TrailMates/image";
  private URL ="http://localhost:8080/TrailMates/history";
  private imageURL ="http://localhost:8080/TrailMates/image";

  constructor(private http:HttpClient, private route:Router) { }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc/');
  }

  getHistoryAsc(userId: string): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc/'+userId);
  }

  getSecureURL(fileExtension: String): Promise<BucketURL> {
    return firstValueFrom(this.http.get<BucketURL>(this.imageURL + "/gen-url/" + fileExtension));
  }

  saveImageData(imageData: ImageData) {
    return this.http.post<ImageData>(this.imageURL, imageData)
  }

  insertNewHistory(newHistory: any) {
    return this.http.post<any>(this.URL+'/newHistory', newHistory);
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
}