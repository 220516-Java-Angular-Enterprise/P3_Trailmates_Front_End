import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';
import { Observable } from 'rxjs';
import { TrailHistory } from '../models/trailHistory';

@Injectable({
  providedIn: 'root'
})
export class TrailHistoryService {
  private URL="http://trailmates.s3-website-us-east-1.amazonaws.com/TrailMates/history";

  constructor(private http:HttpClient, private route:Router) { }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc');
  }

  getHistoryAsc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc');
  }

  insertNewHIstory(newHistory: TrailHistory) {
    return this.http.post<TrailHistory>(this.URL+'/newHistory', newHistory);
  }
}
