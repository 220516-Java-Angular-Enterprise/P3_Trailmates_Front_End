import { PrivateMessage } from './../../../models/privateMessage';
import { Conversation } from './../../../models/conversation';
import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  constructor(private _messageService: MessagesService) { }

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


}
