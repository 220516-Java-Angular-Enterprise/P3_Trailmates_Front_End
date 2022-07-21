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
  constructor(private _friendsService: FriendService, private router: Router) {}
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
    this._friendsService.addFriend(id);
    this.getPendingFriends();
    this.getPendingFriends();
  }
}
