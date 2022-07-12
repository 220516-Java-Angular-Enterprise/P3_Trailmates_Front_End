import { Conversation } from './../models/conversations';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { PrivateMessage } from '../models/privateMessage';
import { OwnedConversation } from '../models/ownedConversation';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor(private http:HttpClient) { }
  url:string ='http://localhost:8080/TrailMates/'

  getExistingConvo():Observable<OwnedConversation[]>{
    return this.http.get<OwnedConversation[]>(this.url +'owned-conversation/active')
  }

   
// sendMessage(msg:string){
 
// }
}
