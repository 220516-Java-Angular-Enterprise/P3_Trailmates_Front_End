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

  URL: string = 'https://revature.trailmates.net/TrailMates/flag'


  postTrailFlag(trailFlagReq: any): Observable<TrailFlag>{
    return this.http.post<any>(this.URL, trailFlagReq);
  }

  getAllByTrail(trail_id: string): Observable<TrailFlag>{
    return this.http.get<TrailFlag>(this.URL+"/trail/"+trail_id);
  }

  getAllFlagsByDateAndTrail(date: Number, trail_id: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+'/dateAndTrail/' + date + '/' + trail_id)
  }
  

  getAllFlagsByUserAndTrail(user_id: string, trail_id: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+'/userAndTrail/' + user_id+ '/' + trail_id)
  }

  getAllByDateAndUser(date: Number, user_id: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"/dateAndUser/"+ date + '/' + user_id);
  }

  getAllByUser(user_id: string): Observable<TrailFlag[]>{
    return this.http.get<TrailFlag[]>(this.URL+"/user/"+ user_id);
  }

  removeTrailById(flag_id: string){
    return this.http.delete(this.URL+'/delete/'+flag_id);
  }
}

