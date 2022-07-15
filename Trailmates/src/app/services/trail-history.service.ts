import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { TrailHistory } from '../models/trailHistory';
import { BucketURL } from '../models/bucketurl';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  // private URL="https://revature.trailmates.net/TrailMates/history";
  // private imageURL = "https://revature.trailmates.net/TrailMates/image";
  private URL ="http://localhost:8080/TrailMates/history";
  private imageURL ="http://localhost:8080/TrailMates/image";

  constructor(private http:HttpClient, private route:Router) { }

  headerList = {
    'Content-Type':'image/*'
  }
  requestOptions = {
    headers: new HttpHeaders(this.headerList),
  }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc/');
  }

  getHistoryAsc(userId: string): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc/'+userId);
  }

  getSecureURL(fileExtension: String): Promise<BucketURL> {
    return firstValueFrom(this.http.get<BucketURL>(this.imageURL + "/gen-url/" + fileExtension));
  }

  // uploadImage(bucketURL: String, uploadedImage: File): Observable<any> {
  //   return this.http.put(bucketURL.toString(), uploadedImage, this.requestOptions);
  // }

  uploadImage(bucketURL: String, uploadedImage: File) {
    const formData = new FormData();
    formData.append('image', uploadedImage);
    return this.http.post<any>(bucketURL.toString(), formData, this.requestOptions);
  }

  saveImageData(imageData: ImageData) {
    return this.http.post<ImageData>(this.imageURL, imageData)
  }

  insertNewHistory(newHistory: TrailHistory) {
    return this.http.post<any>(this.URL+'/newHistory', newHistory);
  }
}