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

  constructor(private http:HttpClient, private route:Router) { }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc');
  }

  getHistoryAsc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc');
  }

  insertNewHistory(newHistory: TrailHistory) {
    return this.http.post<any>(this.URL+'/newHistory', newHistory);
  }
}