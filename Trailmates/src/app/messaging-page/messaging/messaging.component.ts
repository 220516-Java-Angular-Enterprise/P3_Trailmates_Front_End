import { Conversation } from './../../models/conversation';
import { OwnedCoversation } from './../../models/ownedCoversations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router } from '@angular/router';



@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {


  constructor(private route: Router, public messagesService:MessagesService, private currRoute: ActivatedRoute) { }
  private stompClient = require('stompjs');


  convos: OwnedCoversation[] = [];
  convo: Conversation = {};
  id = this.convo.id;
  socket: any;
  reloadChat: boolean = false;
  
  ngOnInit(): void {
    // this.currRoute.params.subscribe(p=>{
    //   this.id = p['id'];
    // })
    this.currRoute.params.subscribe(data => {
      this.id = data['id'];
    })
    console.log("ID: " + this.id)
    this.messagesService.getExistingConvos().subscribe((data: any) =>{
      this.convos = data;
    })
  }


  ngOnDestroy(): void {

  }

  goToGroupChat(convo: Conversation){
    this.route.navigateByUrl("groupchat/"+convo.id)//+localStorage.getItem("id"))
  }

  sendConvoToChatRoom(convo: Conversation){
    //location.reload();
    this.id = convo.id
    this.convo = convo;
    this.socket = new SockJS('http://localhost:8080/TrailMates/testchat');
    this.reloadChat = true;
    console.log(this.convo)
   
  }

  reloadChatPls(reloadChat: any){
    this.reloadChat = reloadChat;
  }

  


}
