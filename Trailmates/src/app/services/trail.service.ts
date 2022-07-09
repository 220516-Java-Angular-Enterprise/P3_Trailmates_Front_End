import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trail } from '../models/trail';

@Injectable({
  providedIn: 'root'
})
export class TrailService {

  constructor(private http: HttpClient) { }
  url: string = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/trail/'

  getAllTrails(): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+'getAll')
  }

  getByName(name: string): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+"search/0/"+name);
  }

  getByState(state: string): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+"searchState/0/"+state);
  }

  getByPark(park: string): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+"searchPark/0/"+park);
  }
}
