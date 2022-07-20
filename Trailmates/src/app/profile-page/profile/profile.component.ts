import { ImageDataService } from './../../services/image-data.service';
import { Friend } from './../../models/friend';
import { FriendService } from 'src/app/services/friend.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrailHistory } from 'src/app/models/trailHistory';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { TrailHistoryComponent } from '../trail-history/trail-history.component';
import { ImageData } from 'src/app/models/imageData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  updateProfilePopup = false;
  showFriendsList = false;
  showMyFriendsList = false;
  updateProfileImage = false;
  popup: boolean = false;
  isFriendsListOpen: boolean = false;
  isMyFriendsListOpen: boolean = false;
  isFriendPost: boolean = true;

  public trailhistory: TrailHistory[] = [];
  public noPosts: string = '';
  public user: User = {
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
    bio: '',
    age: null,
  };

  //user that views others profile//
  public viewerUser: User = {
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
    bio: '',
    age: null,
  };

  public allUsers: User[] = [];
  public trailNames: string[] = [];

  isLoggedIn: boolean = false;
  username: any;
  bio: any;
  map = new Map<string, number>();
  trailNameCount = 0;
  added: boolean = false;
  friendsArray: Friend[] = [];
  friendsList: string[] = [];
  imgURL: string = '';
  id: string | null = localStorage.getItem('id');
  profileImage: ImageData = {};

  constructor(
    public trailHistoryService: TrailHistoryService,
    private userservice: UserService,
    private trailHistoryComp: TrailHistoryComponent,
    private router: Router,
    private http: HttpClient,
    private currRoute: ActivatedRoute,
    private _friendService: FriendService,
    private _imageDataService: ImageDataService,
  ) {}

  async ngOnInit() {
    this.imgURL = this.trailHistoryComp.historyReq.imageURL;

    this.currRoute.params.subscribe((p) => {
      this.username = p['username'];

      //converts null to string
      this.userservice
        .getUserByUsername(this.username as string)
        .subscribe((data: any) => {
          this.viewerUser = data;
          this.refreshProfilePic();
          this.trailHistoryService
            .getHistoryAsc(this.viewerUser.id as string)
            .subscribe((data) => {
              this.trailhistory = data;
            });
        });

      this.userservice.getUserById(this.id as string).subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
      });
    });
    //Gets Friends
    this.refreshFriends();
    //Gets Profile Pic
    this.refreshProfilePic();
  }

  refreshPosts() {
    this.trailHistoryService
      .getHistoryAsc(this.viewerUser.id as string)
      .subscribe((data) => {
        this.trailhistory = data;
      });
  }

  refreshProfilePic(){
    this._imageDataService.getLatestProfilePic(this.viewerUser.id as string).subscribe(
      data=>{
        this.profileImage = data;
        console.log(this.viewerUser)
      }
    )
  }

  refreshUser() {
    this.userservice
      .getUserByUsername(this.username as string)
      .subscribe((data: any) => {
        this.viewerUser = data;
        console.log(this.user);
      });
  }

  refreshFriends() {
    this.friendsList = [];
    this._friendService.getAllFriends().subscribe((data) => {
      this.friendsArray = data;
      this.friendsArray.forEach((element) => {
        if (!this.friendsList.includes(element.friend_id?.id!)) {
          this.friendsList.push(element.friend_id?.id!);
        }
      });
    });
  }

  addFriend(id: any) {
    this._friendService.addFriend(id).subscribe();
    this.refreshFriends();
    this.refreshFriends();
  }

  removeFriend(id: any) {
    this._friendService.removeFreind(id).subscribe();
    this.refreshFriends();
    this.refreshFriends();
  }

  toggleFriendsList() {
    this.isFriendsListOpen = !this.isFriendsListOpen;
  }

  toggleMyFriendsList() {
    this.isMyFriendsListOpen = !this.isMyFriendsListOpen;
  }

  close(event: any) {
    this.popup = event;
    this.updateProfilePopup = event;
    this.updateProfileImage = event;
    this.refreshPosts();
    this.refreshPosts();
    this.refreshPosts();
    this.refreshUser();
    this.refreshProfilePic();
  }

  updateProfilePic(){
    if(this.username == this.user.username){
    this.updateProfileImage = true;
    }else {
      alert("You can't change other people's profile images.")
    }

  }

  onNavigateFriend(){
    if(this.username =! this.user.username){
    this.isFriendPost = false;
    }

  }

  // navigateFriend(){
  //   if(this.router.url == '/profile/'+localStorage.getItem("username")){
  //     this.
  //   })
  // }

  // goToProfile(){
  //   let url = this.router.url;
  //   console.log(url)
  // }
}
