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
  url: string = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/friends/'

addFriend(friend_id: string, friend: Friend) {
  return this.http.post<any>(this.url + friend_id, friend)
}

getAllFriends(): Observable<Friend[]>{
  return this.http.get<Friend[]>(this.url)
}

getAllPending(): Observable<Friend[]>{
  return this.http.get<Friend[]>(this.url + 'pending')
}

}
