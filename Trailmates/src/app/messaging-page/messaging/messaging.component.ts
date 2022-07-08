import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/messages';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {

  constructor(public messagesService:MessagesService) { }

  ngOnInit(): void {
    this.messagesService.openWebSocket();
  }
  ngOnDestroy(): void {
      this.messagesService.closeWebSocket();
  }

  sendMessage(sendForm:NgForm){
 const message= new Message(sendForm.value.user,sendForm.value.message);
 this.messagesService.sendMessage(message);
//sendForm.controls.message.reset();

  }

}
