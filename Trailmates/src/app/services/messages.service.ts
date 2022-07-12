import { Conversation } from './../models/conversations';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { PrivateMessage } from '../models/privateMessage';
import { OwnedCoversation } from '../models/ownedCoversations';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:8080/TrailMates/'
      /*Owned Conversation Requests*/
  getExistingConvos(): Observable<OwnedCoversation[]>{
    return this.http.get<OwnedCoversation[]>(this.url+"owned-conversation/active");
  }
  

}
