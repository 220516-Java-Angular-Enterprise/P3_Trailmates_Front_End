import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrailFlag } from '../models/trailFlag';


@Injectable({
  providedIn: 'root'
})
export class TrailFlagService {

  constructor(private http: HttpClient) { }


  // private header: HttpHeaders = new HttpHeaders()

  url: string = 'http://localhost:8080/TrailMates/flag'


  postTrailFlag(trailFlagReq: any): Observable<TrailFlag>{
    return this.http.post<any>(this.url, trailFlagReq);
  }

  getFlagById(id: string): Observable<TrailFlag>{
    return this.http.get<TrailFlag>(this.url+"/"+id);
  }


  getAllFlagsByDateAndTrail(date: Number, trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+'?d=' + date + '&t=' + trail)
  }

  getAllByDateAndName(date: Number, name: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"?d="+ date + '&u=' + name);
  }

  getAllByUser(name: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"?u="+ name);
  }

  getAllByTrail(trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"?t="+ trail);
  }
}

