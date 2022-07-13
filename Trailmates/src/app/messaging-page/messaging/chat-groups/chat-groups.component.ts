import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conversation } from 'src/app/models/conversation';
import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { MessagesService } from 'src/app/services/messages.service';


@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.scss']
})
export class ChatGroupsComponent implements OnInit {

  constructor(private _messagesService: MessagesService) { }

  @Input() convos: OwnedCoversation[] = [];
  @Output() passCreateGroup: EventEmitter<any> = new EventEmitter()
  @Output() passConversation: EventEmitter<Conversation> = new EventEmitter<Conversation>();


  ngOnInit(): void {
  }

  passConvo(convo: Conversation){
    this.passConversation.emit(convo);
  }

  updateGroups(){
    this._messagesService.getExistingConvos().subscribe((data:any)=>{
      this.convos = data
    })
  }

}
