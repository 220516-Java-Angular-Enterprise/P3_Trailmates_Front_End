import { ImageDataService } from './../../services/image-data.service';
import { Conversation } from 'src/app/models/conversation';
import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { MessagesService } from 'src/app/services/messages.service';
import { FriendService } from './../../services/friend.service';
import { TrailFlagService } from './../../services/trail-flag.service';
import { Trail } from './../../models/trail';
import { Component, Input, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import {} from 'googlemaps';
import { TrailFlag } from 'src/app/models/trailFlag';
import { Friend } from 'src/app/models/friend';
import { TrailReviewService } from 'src/app/services/trail-review.service';
import { TrailReview } from 'src/app/models/trailReview';
import { TrailRating } from 'src/app/models/trail-rating';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss'],
})
export class TrailComponent implements OnInit {
  constructor(
    private _trailService: TrailService,
    private _friendService: FriendService,
    private _userService: UserService,
    private _trailFlagService: TrailFlagService,
    private _route: Router,
    private _currRoute: ActivatedRoute,
    private _trailReviewService: TrailReviewService,
    private _messageService: MessagesService,
    private _imageDataService: ImageDataService
  ) {}

  @Input()
  popup = false;

  fillColor = 'rgb(220,220,220)';

  filterTrail: Trail[] = [];
  allTrails: Trail[] = [];
  allUsers: User[] = [];
  filterUser: User[] = [];
  flagTrails: TrailFlag[] = [];
  trail: Trail = {};
  user: User = {};
  long_desc: string = '';
  latitude: Number = 0;
  longitude: Number = 0;
  regex: RegExp = /(<([^>]+)>)/gi;
  subject: string = '';
  petsAllowed: string = '';
  flagged: boolean = false;
  friended: boolean = false;
  friends: any = {};
  noUsers: boolean = false;
  time: string = '00:00';

  trailFlagReq = {
    trail_id: '',
    user_id: '',
    date_int: 0,
  };

  trailmateFlags: TrailFlag[] = [];

  ngOnInit(): void {
    // Gets all trails on render
    this._trailService.getAllTrails().subscribe((data) => {
      this.allTrails = data;
    });
    // Gets all users on render
    this._userService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.allUsers.forEach((user) => {
        this._imageDataService
          .getLatestProfilePic(user.id as string)
          .subscribe((imageData: any) => {
            user.profilepic = imageData.url;
          });
      });
    });
  }

  // to toggle flag from blank to filled in on click
  flag(event: any) {
    if (event.classList[1] == 'bi-flag') {
      event.classList.replace('bi-flag', 'bi-flag-fill');
    } else if (event.classList[1] == 'bi-flag-fill') {
      this.unflag(event);
    }
  }

  unflag(event: any) {
    if (event.classList[1] == 'bi-flag-fill') {
      event.classList.replace('bi-flag-fill', 'bi-flag');
    }
  }

  friend(event: any) {
    if (event.classList[1] == 'bi-person-plus') {
      event.classList.replace('bi-person-plus', 'bi-person-check-fill');
      this._friendService.addFriend(event.id).subscribe((data) => {
        this.friends = data;
      });
    } else if (event.classList[1] == 'bi-person-check-fill') {
      this.unfriend(event);
    }
  }

  unfriend(event: any) {
    if (event.classList[1] == 'bi-person-check-fill') {
      event.classList.replace('bi-person-check-fill', 'bi-person-plus');
    }
  }

  filter(query: any) {
    // Filters trails array for name
    if (this.subject == 'trails') {
      this.filterTrail = [];
      this.allTrails.forEach((element) => {
        if (
          element.name?.toLowerCase().includes(query.toLowerCase()) &&
          !this.filterTrail.includes(element)
        ) {
          this.filterTrail.push(element);
        }
      });
      // Filters users array for name
    } else if (this.subject == 'users') {
      this.filterUser = [];
      this.allUsers.forEach((element) => {
        if (
          element.username?.toLowerCase().includes(query.toLowerCase()) &&
          !this.filterUser.includes(element)
        ) {
          this.filterUser.push(element);
        }
      });
    }
  }

  showUserDetails(event: any) {
    this._userService.getUserById(event.target.id).subscribe((data: any) => {
      this.user = data;
    });
  }

  noReviews: boolean = false;

  // needs to also render user comments
  showTrailDetails(event: any) {
    this._trailService.getById(event.target.id).subscribe((data: any) => {
      this.trail = data;
      this.trail.long_desc = this.trail.long_desc!.replace(this.regex, '');
      this.latitude = +this.trail.latitude!;
      this.longitude = +this.trail.longitude!;

      // This is the functionality for the google map
      this.initMap(this.latitude, this.longitude);

      //added
      this.getTrailReviews();

      this.getTrailRating();
    });
  }

  // Initialize and add the map
  initMap(lat: any, lng: any): void {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 15,
        center: { lat, lng },
      }
    );

    // creates a red pointer on the page
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
  }

  goToProfile(event: any) {
    this._route.navigateByUrl('/profile/' + event.target.id);
  }

  filterSubject(subject: any) {
    this.subject = subject;
  }

  goToFlag(id: string) {
    this._route.navigateByUrl('/trailpage/flag/' + id);
  }

  checkTrailReq() {
    // gets flags for date and trail
    this._trailFlagService.getAllByTrail(this.trail.id!).subscribe(
      (data: any) => {
        this.trailmateFlags = data;
        console.log(this.trailmateFlags);
        console.log('TRAIL ID: ' + this.trail.id);
      },
      (error: any) => {
        this.noUsers = true;
        console.log(error);
      }
    );
  }

  checkSubmitted(event: any) {
    if (event) {
      this.flag(
        document.getElementById(
          this._currRoute.firstChild?.snapshot.params['id']
        )
      );
    } else {
      this.unflag(
        document.getElementById(
          this._currRoute.firstChild?.snapshot.params['id']
        )
      );
      this._route.navigateByUrl('/trailpage');
    }
  }
  // Added

  trailRating: any = {};

  getTrailRating(): void {
    this._trailReviewService.getAllTrailsReviews(this.trail.id ?? '').subscribe(
      (data) => {
        this.trailRating = data;
        console.log('in star');
      },
      (err) => {
        console.log(err);
        this.trailRating = {};
      }
    );
  }

  getTrailReviews(): void {
    this._trailReviewService.getById(this.trail.id ?? '').subscribe(
      (reviews) => {
        console.log(reviews);
        this.trailReview = reviews;
        this.noReviews = false;
      },
      (err) => {
        this.noReviews = true;
      }
    );
  }

  trailReview: TrailReview[] = [];

  // button displays if want to create new review
  newReview: boolean = false;

  // proccess review form
  // two fields comment and score

  newReviewRequest = {
    rating: 0,
    comment: '',
  };

  placeholders = {
    rating: 'Enter Score',
    comment: 'Enter Comment',
  };
  displayErrorReview: boolean = false;

  validReview(): boolean {
    if (this.newReviewRequest.rating > 0 && this.newReviewRequest.rating < 6) {
      return true;
    } else {
      this.displayErrorReview = true;
      return false;
    }
  }

  submitReview(): void {
    console.log(this.newReviewRequest.comment);
    console.log(this.newReviewRequest.rating);
    if (this.validReview()) {
      this.displayErrorReview = false;
      this.newReview = false;
      this._trailReviewService
        .postTrailReviews(this.trail.id ?? '', this.newReviewRequest)
        .subscribe((data: any) => {
          console.log(data);
          this.getTrailReviews();
          this.getTrailRating();
          this.newReviewRequest.comment = '';
          this.newReviewRequest.rating = 0;
        });
    }
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
        this._route.navigateByUrl('messaging/groupchat/' + convo.id);
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
          this._route.navigateByUrl('/messaging/groupchat/' + convoId);
          console.log('New convo was made.');
        });
      }
    });
  }

  // star

  updateRating(i: any) {
    this.newReviewRequest.rating = i;
    console.log(this.newReviewRequest.rating);
  }

  numbers: any;

  numberSize(n: number): number[] {
    return Array(n)
      .fill(0)
      .map((x, i) => i);
  }
  numberSize5(n: number): number[] {
    return Array(5 - n)
      .fill(0)
      .map((x, i) => i);
  }

  returnFloor(n: number): number {
    return Math.floor(n);
  }

  isHalf(n: number): boolean {
    if (n % 1 > 0.3 && n % 1 <= 0.7) {
      return true;
    } else {
      return false;
    }
  }

  starAmount(n: number): number {
    if (n % 1 <= 0.7) {
      return Math.floor(n);
    } else {
      return Math.ceil(n);
    }
  }

  returnRound(n: number): number {
    if (n % 1 < 0.3) {
      return Math.floor(n);
    } else {
      return Math.ceil(n);
    }
  }
}
