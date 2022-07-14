import { PrivateMessage } from './../../../models/privateMessage';
import { Conversation } from './../../../models/conversation';
import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user-service.service';
import { mergeScan } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  constructor(private _messageService: MessagesService, private userService: UserService) { }

  @Input() convo: Conversation = {};
  privateMessages: PrivateMessage[] = [];


  ngOnInit(): void {
  }

  getPrivateMessages(){
    this._messageService.getPrivateMessagesByConvoName(this.convo.id!).subscribe(
      (data:any)=>{
      this.privateMessages = data;
    },
    (error:any)=>{
      console.log(error);
    })
  }

  consoleConvo(){
    console.log(this.convo);
    this.getPrivateMessages()
    console.log(this.privateMessages);
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
    console.log(privateMessage)

    
    this.postNewMessage(messageRequest)
    this.getPrivateMessages()
    // this.privateMessages.push(privateMessage)
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
}
