import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageData } from '../models/imageData';


@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor(private http: HttpClient) { }

    // url: string = 'http://localhost:8080/TrailMates/image/' 
    url: string = 'https://revature.trailmates.net/TrailMates/image/' 

    getImagebyId(id: string): Observable<ImageData>{
      return this.http.get<ImageData>(this.url+id);
    }

    saveImg(imageReq: any): Observable<ImageData>{
      return this.http.post<ImageData>(this.url, imageReq);
    }


}
