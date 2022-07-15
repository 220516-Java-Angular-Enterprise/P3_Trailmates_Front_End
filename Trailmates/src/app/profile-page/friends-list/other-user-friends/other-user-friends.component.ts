import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import { Friend } from 'src/app/models/friend';
import { FriendService } from 'src/app/services/friend.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-other-user-friends',
  templateUrl: './other-user-friends.component.html',
  styleUrls: ['./other-user-friends.component.scss']
})
export class OtherUserFriendsComponent implements OnInit {

  constructor(private _friendsService: FriendService, private _userService: UserService, private currRoute: ActivatedRoute) { }

  allFriends: Friend[] = [];
  user: User = {};
  username: string = '';

  ngOnInit(): void {
    
    this.currRoute.params.subscribe(
      //Gets displayed username
      p=>{
        this.username = p['username'];
      //Get user by username
        this._userService.getUserByUsername(this.username as string).subscribe(
          data=> {
            this.user = data;
          //Gets friends list for displayed user
          this._friendsService.getAllFriendsByUserID(this.user.id!).subscribe(
            data=>{
              this.allFriends = data;
            }
          )
          }
        )
      }
      
    )

  }

}
