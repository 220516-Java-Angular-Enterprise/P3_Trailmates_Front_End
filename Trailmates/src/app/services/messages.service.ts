import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/messages';
import { HttpClient } from '@angular/common/http';
import { OwnedCoversation } from '../models/ownedCoversations';
import { User } from '../models/user';
import { PrivateMessage } from '../models/privateMessage';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  webSocket!: WebSocket;
  message: Message[] =[];//stores all the messages that will come from backend

  constructor(private http: HttpClient) { }
  private url: string = 'https://revature.trailmates.net/TrailMates/'

  getExistingConvos(): Observable<OwnedCoversation[]>{
    return this.http.get<OwnedCoversation[]>(this.url+"owned-conversation/active");
  }

  getPeopleInChatByConvoId(id: string): Observable<User[]>{
    return this.http.get<User[]>(this.url+"owned-converastion/active-in-chat/"+id);
  }

  getPrivateMessagesByConvoName(id: string): Observable<PrivateMessage[]>{
    return this.http.get<PrivateMessage[]>(this.url+"private-message/conversation/"+id);
  }

  createNewGroup(groupReq: any){
    return this.http.post<any>(this.url+"conversation/new-conversation", groupReq)
    .subscribe((data:any)=>{
      console.log(data);
    })
  }
  
  postNewMessage(message: any): Observable<any>{
    return this.http.post<any>(this.url+"private-message", message)
  }

}
