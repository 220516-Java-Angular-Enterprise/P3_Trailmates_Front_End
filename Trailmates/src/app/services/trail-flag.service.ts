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

  url: string = 'https://revature.trailmates.net/TrailMates/flag'
  // url: string = 'http://localhost:8080/TrailMates/flag'


  postTrailFlag(trailFlagReq: any): Observable<TrailFlag>{
    return this.http.post<any>(this.url, trailFlagReq);
  }

  getFlagById(id: string): Observable<TrailFlag>{
    return this.http.get<TrailFlag>(this.url+"/"+id);
  }


  getAllFlagsByDateAndTrail(date: Number, trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+'/dateAndTrail/' + date + '/' + trail)
  }

  getAllByDateAndName(date: Number, name: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"?d="+ date + '&u=' + name);
  }

  getAllByUser(id: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"/user/"+ id);
  }

  getAllByTrail(trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"/trail/"+ trail);
  }

  removeTrailById(id: string){
    return this.http.delete(this.url+'/delete/'+id);
  }
}

