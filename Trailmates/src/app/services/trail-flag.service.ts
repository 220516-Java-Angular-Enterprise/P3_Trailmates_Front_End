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

  //url: string = 'http://localhost:8080/TrailMates/flag'
  private URL = "http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/flag";

  postTrailFlag(trailFlagReq: any): Observable<TrailFlag>{
    return this.http.post<any>(this.URL, trailFlagReq);
  }

  getFlagById(id: string): Observable<TrailFlag>{
    return this.http.get<TrailFlag>(this.URL+"/"+id);
  }


  getAllFlagsByDateAndTrail(date: Number, trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+'?d=' + date + '&t=' + trail)
  }

  getAllByDateAndName(date: Number, name: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"?d="+ date + '&u=' + name);
  }

  getAllByUser(name: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"?u="+ name);
  }

  getAllByTrail(trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"?t="+ trail);
  }
}

