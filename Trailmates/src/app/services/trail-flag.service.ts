import { TrailFlag } from './../models/trailFlag';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrailFlagService {

  constructor(private http: HttpClient) { }

  // private header: HttpHeaders = new HttpHeaders()

  private rootURL = 'http://localhost:8080/trailmates/flag/2750C574-18E4-45F7-B209-740A69A46729';


  postTrailFlag(trailFlagReq: any): Observable<TrailFlag>{
    return this.http.post<any>(this.rootURL, trailFlagReq);
  }

  getFlagById(id: string): Observable<TrailFlag>{
    return this.http.get<TrailFlag>(this.rootURL);
  }
}
