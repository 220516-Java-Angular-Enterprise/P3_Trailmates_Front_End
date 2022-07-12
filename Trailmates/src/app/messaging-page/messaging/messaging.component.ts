
import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Conversation } from 'src/app/models/conversations';
import { PrivateMessage } from 'src/app/models/privateMessage';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {


  constructor(public messagesService:MessagesService, private currRoute: ActivatedRoute) { }

  id: string = '';
  ownedConversation: OwnedCoversation[]=[];
  conversation: Conversation[]=[];

  ngOnInit(): void {
    this.currRoute.params.subscribe(p=>{
      this.id = p['id'];
    })
    this.messagesService.getExistingConvos().subscribe((data)=>{
      this.ownedConversation=data;
    }
    )
  }
  ngOnDestroy(): void {
      
  }

 
//sendForm.controls.reset();

  }

