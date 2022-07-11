import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { User } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/";
  
  constructor(private http: HttpClient, private route: Router) { }

  login(auth: User){
    return this.http.post<any>(this.URL + "auth/", auth)
  }
  signUp(user: User){
    return firstValueFrom(this.http.post<any>(this.URL + "auth/newuser", user));
  }
  getAuthToken(){
    return localStorage.getItem("token"); 
  }
  isLoggedIn() {
    // !! means double negattion, return boolean
    return !!localStorage.getItem("token")
  }
  logoutUser() {
    // navigates user back to login and removes local storage
    this.route.navigate(['login'])
    window.localStorage.clear();
  }
}