import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/messages';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  webSocket!: WebSocket;
  message: Message[] =[];//stores all the messages that will come from backend

  constructor() { }

      /*Opens Connection*/
  public openWebSocket(){
    this.webSocket=new WebSocket('ws://localhost:8080/messages');

    this.webSocket.onopen=(event)=> {
      console.log('Open:',event);
    };

    this.webSocket.onmessage = (event)=>{
  const message =JSON.parse(event.data);
  this.message.push(message);
    };

    this.webSocket.onclose = (event) => {
      console.log ('Close:',event);
    };
  }
  public sendMessage(message:Message){
    this.webSocket.send(JSON.stringify(message));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }
}
