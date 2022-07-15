import { Router } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor(private _friendsService: FriendService, private router: Router) { }
  pendingFriends: Friend[] = []; 
  allFriends: Friend[] = [];
  showFriends: boolean = true;
  showPending: boolean = false;

  ngOnInit(): void {
    this.getFriends()

    this.getPendingFriends();
  }

  getFriends(){
      this._friendsService.getAllFriends().subscribe(
      data=>{
      this.allFriends = data;
      }
    )
  }

  getPendingFriends(){
    this._friendsService.getAllPending().subscribe(
      data=>{
        this.pendingFriends = data;
      }
    )
  }

  toggle(){
    this.showFriends = !this.showFriends;
    this.showPending = !this.showPending;
  }

  goToProfile(username: string){
    this.router.navigateByUrl('/profile/'+username)
  }

  goToMessaging(){
    this.router.navigateByUrl('/messaging');
  }

  addFriend(id: string){
    this._friendsService.addFriend(id)
    this.getPendingFriends();
    this.getPendingFriends();
    this.getFriends();
    this.getFriends();
  }






  
}


