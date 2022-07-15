import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Friend } from '../models/friend';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }
  url: string = 'https://revature.trailmates.net/TrailMates/friends/'
  // url: string = 'http://localhost:8080/TrailMates/friends/'

addFriend(friend_id: string) {
  return this.http.post<any>(this.url + friend_id, null)
}

getAllFriends(): Observable<Friend[]>{
  return this.http.get<Friend[]>(this.url)
}

getAllPending(): Observable<Friend[]>{
  return this.http.get<Friend[]>(this.url + 'pending')
}

}
