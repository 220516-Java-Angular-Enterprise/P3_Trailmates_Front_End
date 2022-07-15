import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { TrailHistory } from '../models/trailHistory';

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  private URL="https://revature.trailmates.net/TrailMates/history";
  private imageURL = "https://revature.trailmates.net/TrailMates/image";

  constructor(private http:HttpClient, private route:Router) { }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc/');
  }

  getHistoryAsc(userId: string): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc/'+userId);
  }

  getSecureURL(fileExtension: String): Promise<String> {
    return firstValueFrom(this.http.get<String>(this.imageURL + "/gen-url/" + fileExtension));
  }

  uploadImage(bucketURL: string, uploadedImage: File) {
    return this.http.put<File>(bucketURL, uploadedImage);
  }

  saveImageData(imageData: ImageData) {
    return this.http.post<ImageData>(this.imageURL, imageData)
  }

  insertNewHistory(newHistory: TrailHistory) {
    return this.http.post<any>(this.URL+'/newHistory', newHistory);
  }
}