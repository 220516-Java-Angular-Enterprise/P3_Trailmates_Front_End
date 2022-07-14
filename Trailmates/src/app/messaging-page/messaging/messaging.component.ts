import { Conversation } from './../../models/conversation';
import { OwnedCoversation } from './../../models/ownedCoversations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {


  constructor(public messagesService:MessagesService, private currRoute: ActivatedRoute) { }


  convos: OwnedCoversation[] = [];
  convo: Conversation = {};
  id = this.convo.id;
  
  ngOnInit(): void {
    // this.currRoute.params.subscribe(p=>{
    //   this.id = p['id'];
    // })
    console.log(this.id)
    this.messagesService.getExistingConvos().subscribe((data: any) =>{
      this.convos = data;
    })
  }


  ngOnDestroy(): void {

  }

  sendConvoToChatRoom(convo: Conversation){
    this.id = convo.id
    this.convo = convo;
    console.log(this.convo)
  }


}
