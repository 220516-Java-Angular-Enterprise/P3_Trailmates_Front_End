import { Component, OnInit} from '@angular/core';
import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { MessagesService } from 'src/app/services/messages.service';
import { PrivateMessage } from 'src/app/models/privateMessage';
import { Conversation } from 'src/app/models/conversations';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(private messageService:MessagesService) { }

  ngOnInit(): void {
  }

}
