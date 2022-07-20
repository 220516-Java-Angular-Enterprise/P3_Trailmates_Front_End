import { ImageDataService } from './../../../services/image-data.service';
import { PrivateMessage } from './../../../models/privateMessage';
import { Conversation } from './../../../models/conversation';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user-service.service';
import { mergeScan } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ThisReceiver } from '@angular/compiler';
import { ImageData } from 'src/app/models/imageData';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  
  id?: string;
  username?: string;
  randInt?: string;
  profImg?: ImageData;
  //archived_msg?: string;
  
  greetings: string[] = [];
  constructor(private _messageService: MessagesService, private userService: UserService, private currRoute: ActivatedRoute, private _imageDataService: ImageDataService) { }
  ngOnInit(): void {
    this.currRoute.params.subscribe(data => {
        this.id = data['id'];
    })
    this.connect();
    this.getPrivateMessages();
    this.getProfPic()

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

  getProfPic(){
    this._imageDataService.getLatestProfilePic(localStorage.getItem('id')!)
    .subscribe(image => {this.profImg = image})
  }

  getPrivateMessages(){
    this._messageService.getPrivateMessagesByConvoName(this.id!).subscribe(
      (data:any)=>{
      this.privateMessages = data;
      this.privateMessages.forEach(message=>{
        this._imageDataService.getLatestProfilePic(message.sender_id!.id as string)
        .subscribe(imageData=>{
          message.sender_id!.profilepic = imageData.url
        })
        message.time_sent = new Date(message.time_sent).toLocaleString()
      })
    },
    (error:any)=>{
      console.log(error);
    })
    console.log("PM LENGTH: " + this.privateMessages.length);
  }

  consoleConvo(){
    console.log(this.convo);
    console.log(this.privateMessages);
  }
  onKeydown(event: any){
    event.preventDefault();
  }

  message ='';
  submitMessage(message: string | undefined){
    let privateMessage: PrivateMessage = {
      time_sent: new Date(),
      conversation: this.convo
    }

    //privateMessage.time_sent.

    let messageRequest = {
      message: message,
      time_sent: privateMessage.time_sent!.getTime(),///(1000*60*60*24)),//Math.round(privateMessage.time_sent!.getTime()/(1000*60*60*24)),
      conversation_id: this.id
    }

    console.log("Convo ID1: " + messageRequest.conversation_id);

    this.userService.getUserById(localStorage.getItem('id')!).subscribe(
      data => privateMessage.sender_id = data
    )

    privateMessage.message = message; 
    console.log(this.message)

    
    this.postNewMessage(messageRequest)
    // this.getPrivateMessages()
    this.message = '';
  }

  postNewMessage(message: any){

    console.log("Message: " + message.message)
    console.log("Time Sent: " + message.time_sent)
    console.log("ConvoId: " + message.conversation_id)
    this._messageService.postNewMessage(message).subscribe(
      data =>{
        console.log(data)
      }
    )
  }


  connect() {
    const socket = new SockJS(
      'https://revature.trailmates.net/TrailMates/testchat'
    );
    console.log("Reloading the connection")
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected2: ' + frame);
      _this.stompClient.subscribe('/start/initial', function( hello: {body: string}){
        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }
  
@Output() passReloadChat: EventEmitter<boolean> = new EventEmitter();

  sendMessage() {
    let time = new Date().toLocaleString();
    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(
        this.id +
          '~' +
          this.profImg?.url +
          '`' +
          localStorage.getItem('username') +
          '♪' +
          this.newmessage +
          '♪' + 
          time
      )
    );
    this.submitMessage(this.newmessage);
    this.newmessage = "";
  }
  
  showMessage(message: string) {
      var split = message.split("~");
      if (split[0] == this.id) { this.greetings.push(split[1]); } 
  }
}
