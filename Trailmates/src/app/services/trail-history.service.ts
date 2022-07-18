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
  // private URL ="http://localhost:8080/TrailMates/history";
  // private imageURL ="http://localhost:8080/TrailMates/image";

  constructor(private http:HttpClient, private route:Router) { }

  getHistoryDesc(): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/desc/');
  }

  getHistoryAsc(userId: string): Observable<TrailHistory[]> {
    return this.http.get<TrailHistory[]>(this.URL+'/asc/'+userId);
  }


  insertNewHistory(newHistory: any) {
    return this.http.post<any>(this.URL+'/newHistory', newHistory);
  }

}