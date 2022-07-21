import { MessagesService } from './../../../services/messages.service';
import { Conversation } from './../../../models/conversation';
import { OwnedCoversation } from './../../../models/ownedCoversations';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-other-user-friends',
  templateUrl: './other-user-friends.component.html',
  styleUrls: ['./other-user-friends.component.scss'],
})
export class OtherUserFriendsComponent implements OnInit {
  constructor(
    private _friendsService: FriendService,
    private _userService: UserService,
    private currRoute: ActivatedRoute,
    private router: Router,
    private _messageService: MessagesService
  ) {}

  allFriends: Friend[] = [];
  user: User = {};
  username: string = '';

  ngOnInit(): void {
    this.currRoute.params.subscribe(
      //Gets displayed username
      (p) => {
        this.username = p['username'];
        //Get user by username
        this._userService
          .getUserByUsername(this.username as string)
          .subscribe((data) => {
            this.user = data;
            //Gets friends list for displayed user
            this._friendsService
              .getAllFriendsByUserID(this.user.id!)
              .subscribe((data) => {
                this.allFriends = data;
              });
          });
      }
    );
  }

  goToProfile(username: any) {
    this.router.navigateByUrl('/profile/' + username);
  }

  addFriend(id: string) {
    this._friendsService.addFriend(id).subscribe((data) => {
      console.log(data);
    });
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
