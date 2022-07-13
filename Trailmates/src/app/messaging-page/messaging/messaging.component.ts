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

  id: string = '';
  convos: OwnedCoversation[] = [];
  convo: Conversation = {};

  
  ngOnInit(): void {
    this.currRoute.params.subscribe(p=>{
      this.id = p['id'];
    })
    this.messagesService.getExistingConvos().subscribe((data: any) =>{
      this.convos = data;
    })
  }


  ngOnDestroy(): void {

  }

  sendConvoToChatRoom(convo: Conversation){
    this.convo = convo;
    console.log(this.convo)
  }

  consoleConvos(){
    console.log(this.convos)
  }

  updateGroups(){
    this.messagesService.getExistingConvos().subscribe((data: any)=>{
      this.convos = data;
    })



  }

}
