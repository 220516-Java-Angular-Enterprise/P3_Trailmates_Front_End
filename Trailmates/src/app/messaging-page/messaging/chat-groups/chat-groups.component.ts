import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conversation } from 'src/app/models/conversation';
import { OwnedCoversation } from 'src/app/models/ownedCoversations';


@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.scss']
})
export class ChatGroupsComponent implements OnInit {

  constructor() { }

  @Input() convos: OwnedCoversation[] = [];
  @Output() passConversation: EventEmitter<Conversation> = new EventEmitter<Conversation>();


  ngOnInit(): void {
  }

  passConvo(convo: Conversation){
    this.passConversation.emit(convo);
  }

}
