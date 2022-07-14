import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public ROOT_URL = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/user/';
 // localhost:8080
//  public ROOT_URL = 'http://localhost:8080/TrailMates/user/';

  constructor(private http: HttpClient) {
  }

  getUserById (id: string): Observable<User> {
    return this.http.get<User>(this.ROOT_URL +`user-id/${id}`);
  }

  getUserByUsername (username: string): Observable<User> {
    return this.http.get<User>(this.ROOT_URL +`user-username/${username}`);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.ROOT_URL+"all-users");
  }
}

