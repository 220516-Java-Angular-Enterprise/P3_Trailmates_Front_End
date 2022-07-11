import { OwnedCoversation } from './../../models/ownedCoversations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/messages';
import { ActivatedRoute } from '@angular/router';
import { Conversation } from 'src/app/models/conversation';



@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {


  constructor(public messagesService:MessagesService, private currRoute: ActivatedRoute) { }

  id: string = '';
  convos: OwnedCoversation[] = [];
  
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

}
