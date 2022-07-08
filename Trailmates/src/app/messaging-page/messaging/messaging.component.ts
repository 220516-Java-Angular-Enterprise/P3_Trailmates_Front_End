import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/messages';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {

  constructor(public messagesService:MessagesService, private currRoute: ActivatedRoute) { }

  id: string = '';
  ngOnInit(): void {
    this.messagesService.openWebSocket();
    this.currRoute.params.subscribe(p=>{
      this.id = p['id'];
    })
  }
  ngOnDestroy(): void {
      this.messagesService.closeWebSocket();
  }

  sendMessage(sendForm:NgForm){
    const message= new Message(sendForm.value.user,sendForm.value.message);
    this.messagesService.sendMessage(message);
//sendForm.controls.reset();

  }

}
