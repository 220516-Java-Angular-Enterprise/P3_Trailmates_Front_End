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

  private URL = "";
  constructor(private http: HttpClient, private route: Router) { }

  login(auth: User){
    return this.http.post<any>(this.URL + "auth", auth)
  }
  signUp(user: User){
    return firstValueFrom(this.http.post<any>(this.URL + "users", user));
  }
  getAuthToken(){
    return localStorage.getItem("token"); 
  }
}
