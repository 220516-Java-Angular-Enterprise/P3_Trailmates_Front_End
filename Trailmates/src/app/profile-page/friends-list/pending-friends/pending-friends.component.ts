import { MessagesService } from './../../../services/messages.service';
import { Conversation } from './../../../models/conversation';
import { OwnedCoversation } from './../../../models/ownedCoversations';
import { User } from './../../../models/user';
import { Friend } from './../../../models/friend';
import { Router } from '@angular/router';
import { FriendService } from './../../../services/friend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-friends',
  templateUrl: './pending-friends.component.html',
  styleUrls: ['./pending-friends.component.scss'],
})
export class PendingFriendsComponent implements OnInit {
  constructor(
    private _friendsService: FriendService,
    private router: Router,
    private _messageService: MessagesService
  ) {}
  pendingFriends: Friend[] = [];

  ngOnInit(): void {
    this.getPendingFriends();
  }

  getPendingFriends() {
    this._friendsService.getAllPending().subscribe((data) => {
      this.pendingFriends = data;
    });
  }

  goToProfile(username: string) {
    this.router.navigateByUrl('/profile/' + username);
  }

  addFriend(id: string) {
    this._friendsService.addFriend(id).subscribe((data) => {
      console.log(data);
    });
    this.getPendingFriends();
    this.getPendingFriends();
  }

  goToMessage(user: User) {
    let ownedConvo: OwnedCoversation[] = [];
    let convo: Conversation = {
      id: '',
      name: '',
    };
    //Gets existing convos
    this._messageService.getExistingConvos().subscribe((data) => {
      ownedConvo = data;
      ownedConvo.forEach((owned) => {
        //Checks if convo by naming convention exists already
        if (
          owned.conversation?.name ==
          `${user.username!}:${localStorage.getItem('username')}`
        ) {
          //Sets it equal to convo to compare.
          convo = owned.conversation;
          console.log('Happen 1');
        } else if (
          owned.conversation?.name ==
          `${localStorage.getItem('username')}:${user.username!}`
        ) {
          convo = owned.conversation;
          console.log('Happen 2');
        }
      });
      //If convo id is still == '', meaning that the convo name did exist already.
      if (convo.id !== '') {
        this.router.navigateByUrl('messaging/groupchat/' + convo.id);
        console.log('No new convos made.');
      } else if (convo.id === '') {
        //Else creates new convo based on this n  aming convention.
        let convoReq = {
          conversationName:
            user.username + ':' + localStorage.getItem('username'),
          userIDs: [user.id],
        };
        let convoId = '';
        this._messageService.createNewGroup(convoReq).subscribe((data) => {
          convoId = data.id;
          this.router.navigateByUrl('/messaging/groupchat/' + convoId);
          console.log('New convo was made.');
        });
      }
    });
  }
}
