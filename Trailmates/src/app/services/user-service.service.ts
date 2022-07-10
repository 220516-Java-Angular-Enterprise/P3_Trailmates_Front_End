import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }
  public ROOT_URL = 'http://trailmates-env.eba-xbirnvx2.us-east-2.elasticbeanstalk.com/TrailMates/user/';
  getUserById (id: string): Observable<User> {
    return this.http.get<User>(this.ROOT_URL +`${id}`);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.ROOT_URL+"all-users");
  }
}
