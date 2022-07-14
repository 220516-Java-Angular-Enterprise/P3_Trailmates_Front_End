import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { TrailHistory } from '../models/trailHistory';

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  private URL="http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/history";
  private imageURL = "http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/image/gen-url/";

  constructor(private http:HttpClient, private route:Router) { }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc');
  }

  getHistoryAsc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc');
  }

  getSecureURL(fileExtension: String): Promise<String> {
    return firstValueFrom(this.http.get<String>(this.imageURL + fileExtension));
  }

  uploadImage(bucketURL: string, uploadedImage: File) {
    return this.http.put<File>(bucketURL, uploadedImage);
  }

  insertNewHistory(newHistory: TrailHistory) {
    return this.http.post<any>(this.URL+'/newHistory', newHistory);
  }
}