import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {User} from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public ROOT_URL = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/user/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.ROOT_URL+"all-users");
  }
}
