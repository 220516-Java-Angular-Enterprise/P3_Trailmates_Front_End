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

<<<<<<< HEAD
  URL: string = 'https://revature.trailmates.net/TrailMates/flag'
=======
  url: string = 'https://revature.trailmates.net/TrailMates/flag'
  // url: string = 'http://localhost:8080/TrailMates/flag'
>>>>>>> 9374765adc5813304cc1cac306d654a4f4a24b8e


  postTrailFlag(trailFlagReq: any): Observable<TrailFlag>{
    return this.http.post<any>(this.URL, trailFlagReq);
  }

  getFlagById(id: string): Observable<TrailFlag>{
    return this.http.get<TrailFlag>(this.URL+"/"+id);
  }


  getAllFlagsByDateAndTrail(date: Number, trail: string): Observable<TrailFlag[]>{
<<<<<<< HEAD
    return this.http.get<TrailFlag[]>(this.URL+'?d=' + date + '&t=' + trail)
=======
    return this.http.get<TrailFlag[]>(this.url+'/dateAndTrail/' + date + '/' + trail)
>>>>>>> 9374765adc5813304cc1cac306d654a4f4a24b8e
  }

  getAllByDateAndName(date: Number, name: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"?d="+ date + '&u=' + name);
  }

  getAllByUser(name: string): Observable<TrailFlag[]>{
<<<<<<< HEAD
    return this.http.get<TrailFlag[]>(this.URL+"?u="+ name);
  }

  getAllByTrail(trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"?t="+ trail);
=======
    return this.http.get<TrailFlag[]>(this.url+"/user/"+ name);
  }

  getAllByTrail(trail: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.url+"/trail/"+ trail);
>>>>>>> 9374765adc5813304cc1cac306d654a4f4a24b8e
  }
}

