import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/messages';
import { HttpClient } from '@angular/common/http';
import { OwnedCoversation } from '../models/ownedCoversations';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  webSocket!: WebSocket;
  message: Message[] =[];//stores all the messages that will come from backend

  constructor(private http: HttpClient) { }
  url: string = 'http://trailmates-env.us-east-1.elasticbeanstalk.com/TrailMates/'

  getExistingConvos(): Observable<OwnedCoversation[]>{
    return this.http.get<OwnedCoversation[]>(this.url+"owned-conversation/active");
  }

}
