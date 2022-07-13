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
  //url: string = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/trail/'
  url: string = 'http://localhost:8080/TrailMates/trail/'
  
  // Gets all trails from backend with GET request
  getAllTrails(): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+'getAll')
  }

  //Get trail by name input with GET request
  getByName(name: string): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+"search/0/"+name);
  }

  //Get trail by state input with GET request
  getByState(state: string): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+"searchState/0/"+state);
  }

  //Get trail by park input with GET request
  getByPark(park: string): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.url+"searchPark/0/"+park);
  }

  //Get trail by id input with GET request
  getById(id: string): Observable<Trail>{
    return this.http.get<Trail>(this.url+id);
  }
}
