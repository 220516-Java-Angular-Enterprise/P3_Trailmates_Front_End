import { MessagesService } from 'src/app/services/messages.service';
import { Conversation } from 'src/app/models/conversation';
import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  constructor(private _friendsService: FriendService, private router: Router, private _messageService: MessagesService) {}
  pendingFriends: Friend[] = [];
  allFriends: Friend[] = [];
  showFriends: boolean = true;
  showPending: boolean = false;

  ngOnInit(): void {
    this.getFriends();

    this.getPendingFriends();
  }

  getFriends() {
    this._friendsService.getAllFriends().subscribe((data) => {
      this.allFriends = data;
    });
  }

  getPendingFriends() {
    this._friendsService.getAllPending().subscribe((data) => {
      this.pendingFriends = data;
    });
  }

  toggle() {
    this.showFriends = !this.showFriends;
    this.showPending = !this.showPending;
  }

  goToProfile(username: string) {
    this.router.navigateByUrl('/profile/' + username);
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
            `${user.username!}:${localStorage.getItem('username')}` ||
          owned.conversation?.name ==
            `${localStorage.getItem('username')}:${user.username!}`
        ) {
          //Sets it equal to convo to compare.
          convo = owned;
        }
      });
      //If convo id is not still == '', meaning that the convo name did exist already.
      if (convo.id != '') {
        this.router.navigateByUrl('messaging/groupchat/' + convo.id);
        console.log('No new convos made.');
      } else {
        //Else creates new convo based on this naming convention.
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

  addFriend(id: string) {
    this._friendsService.addFriend(id);
    this.getPendingFriends();
    this.getPendingFriends();
    this.getFriends();
    this.getFriends();
  }
}


