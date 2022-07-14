import { PrivateMessage } from './../../../models/privateMessage';
import { Conversation } from './../../../models/conversation';
import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user-service.service';
import { mergeScan } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  
  // stompClient?: Stomp.Client;
  id?: string;
  username?: string;
  randInt?: string;
  // newmessage?: string;
  // greetings: any;
  
  greetings: string[] = [];
  constructor(private _messageService: MessagesService, private userService: UserService, private currRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // this.id = this.currRoute.firstChild?.snapshot.params['id'];
    this.currRoute.params.subscribe(data => {
      if(data['id'] !== this.id) {
        this.id = data['id'];
        this.connect();
      }
    })
    
  }

  newmessage: string | undefined;
  disabled = true;
  private stompClient = require('stompjs');
  @Input() convo: Conversation = {

  };
  privateMessages: PrivateMessage[] = [];

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }

  getPrivateMessages(){
    this._messageService.getPrivateMessagesByConvoName(this.id!).subscribe(
      (data:any)=>{
      this.privateMessages = data;
    },
    (error:any)=>{
      console.log(error);
    })
  }

  consoleConvo(){
    console.log(this.convo);
    // this.getPrivateMessages()
    console.log(this.privateMessages);
  }
  onKeydown(event: any){
    event.preventDefault();
  }

  message ='';
  submitMessage(){
    let privateMessage: PrivateMessage = {
      time_sent: new Date(),
      conversation: this.convo
    }

    let messageRequest = {
      message: this.message,
      time_sent: Math.round(privateMessage.time_sent!.getTime()/(1000*60*60*24)),
      conversation_id: this.convo.id
    }

    this.userService.getUserById(localStorage.getItem('id')!).subscribe(
      data => privateMessage.sender_id = data
    )

    privateMessage.message = this.message; 
    console.log(this.message)

    
    this.postNewMessage(messageRequest)
    // this.getPrivateMessages()
    this.message = '';
  }

  postNewMessage(message: any){
    let datum = ''
    this._messageService.postNewMessage(message).subscribe(
      data => { datum=data
      console.log(datum)
      },
      err => console.log(err)
    )
  }


  connect() {
    const socket = new SockJS('http://localhost:5000/TrailMates/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/start/initial', function( hello: {body: string}){
        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }
  
  sendMessage() {
    this.submitMessage();
    // this.userService.getUserById(localStorage.getItem('id')!).subscribe(
    //   data => data.username = this.username
    // )
    // console.log(this.username)
    this.stompClient.send(
      '/current/resume',
      {},
      //this.obj
      JSON.stringify(this.id + "~" + localStorage.getItem('username') + ": " + this.newmessage)
    );
    this.newmessage = "";
  }
  
  showMessage(message: string) {
      var split = message.split("~");
      console.log(this.id)
      if (split[0] == this.id) { this.greetings.push(split[1]); } 
  }
}
