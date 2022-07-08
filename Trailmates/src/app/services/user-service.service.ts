import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }
  userURL: string | undefined;
  getUserById (id: string): Promise<User> {
    return firstValueFrom(this.http.get<User>(this.userURL + "/" + id));
  }


}
