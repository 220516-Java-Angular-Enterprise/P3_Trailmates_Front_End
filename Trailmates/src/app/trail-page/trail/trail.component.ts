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
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {

  constructor(private _trailService: TrailService, private _friendService: FriendService, private _userService: UserService, private _trailFlagService: TrailFlagService, private _route: Router, private _currRoute: ActivatedRoute, private _trailReviewService: TrailReviewService){ }
  
  @Input()
  popup = false;

  fillColor = 'rgb(220,220,220)';
  
  filterTrail: Trail[] = [];
  allTrails: Trail[] = [];
  allUsers: User[] = [];
  filterUser: User[] = [];
  flagTrails: TrailFlag[] = []
  trail: Trail = {};
  user: User = {};
  long_desc: string = '';
  latitude: Number = 0;
  longitude: Number = 0;
  regex: RegExp = /(<([^>]+)>)/ig;
  subject: string = '';
  petsAllowed: string = '';
  flagged: boolean = false;
  friended: boolean = false;
  friends: any = {}

  ngOnInit(): void {
    // Gets all trails on render
    this._trailService.getAllTrails().subscribe((data)=>{
      this.allTrails = data;
    })
    // Gets all users on render
    this._userService.getAllUsers().subscribe((data)=>{
      this.allUsers = data;
    })
  }

  // to toggle flag from blank to filled in on click
  flag(event: any) {
    // this.flagged = !this.flagged
    if(event.classList[1] == "bi-flag"){
      event.classList.replace("bi-flag", "bi-flag-fill")
    } else if (event.classList[1] == "bi-flag-fill"){
      this.unflag(event)
    }
  }

  unflag(event: any){
      if(event.classList[1] == "bi-flag-fill"){
      event.classList.replace("bi-flag-fill", "bi-flag")
    }
  }

  friend(event: any) {
    if(event.classList[1] == "bi-person-plus"){
      event.classList.replace("bi-person-plus", "bi-person-check-fill")
      this._friendService.addFriend(event.id).subscribe((data) => {
          this.friends = data;
        })
    } else if (event.classList[1] == "bi-person-check-fill"){
      this.unfriend(event)
    }
  }

  unfriend(event: any) {
    if(event.classList[1] == "bi-person-check-fill"){
      event.classList.replace("bi-person-check-fill", "bi-person-plus")
    }
  }

  filter(query: any){
  // Filters trails array for name
  if(this.subject == 'trails'){
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
  }else if (this.subject == 'users'){
    this.filterUser = [];
    this.allUsers.forEach((element)=>{
      if(element.username?.toLowerCase().includes(query.toLowerCase()) && !this.filterUser.includes(element)){
        this.filterUser.push(element);
      }
    })
  }
  }

  showUserDetails(event: any) {
    this._userService.getUserById(event.target.id).subscribe((data: any) => {
      this.user = data
    })
  }

  trailid: string = '';
  noReviews: boolean = false;

  // needs to also render user comments
  showTrailDetails(event: any) {
    this._trailService.getById(event.target.id).subscribe((data: any) => {
      this.trail = data
      this.trail.long_desc = this.trail.long_desc!.replace(this.regex, "")
      this.latitude = +this.trail.latitude!;
      this.longitude = +this.trail.longitude!;
      this.trailid = event.target.id;
    
      // This is the functionality for the google map
      this.initMap(this.latitude, this.longitude)

      console.log(event.target.id)

      this.getTrailReviews()
  

      // get all review of

    })
    }

    getTrailReviews(): void {
      this._trailReviewService.getById(this.trailid).subscribe((reviews) => {
        console.log(reviews)
        this.trailReview = reviews;
        this.noReviews = false;
      },
        (err => {
          this.noReviews = true;
        }))

    }
   
   trailReview: TrailReview[] = [] 

  // button displays if want to create new review
  newReview: boolean = false;

  // proccess review form
  // two fields comment and score

  newReviewRequest = {
    rating: 0,
    comment: ''
  }

  placeholders = {
    rating: "Enter Score",
    comment: "Enter Comment",
  };
  displayErrorReview: boolean = false;

  validReview(): boolean {
    if (this.newReviewRequest.rating > 0 && this.newReviewRequest.rating < 6) {
      return true;
    }
    else {
      this.displayErrorReview = true;
      return false;
    }

  }

  submitReview(): void {
    console.log(this.newReviewRequest.comment)
    console.log(this.newReviewRequest.rating)
    if (this.validReview()) {
      this.displayErrorReview = false;
      this.newReview = false;
      this._trailReviewService.postTrailReviews(this.trailid, this.newReviewRequest).subscribe((data: any) => {
        console.log(data)
        this.getTrailReviews()
        ;
      })
  }}

// if newReview True for pops up with two input score and coment
// for now both will be test input


//   /**
// * Gets the Average rating and Count of all the reviews on a given trail
// * @param token The token of the given user trying to call the backend
// * @param trailID The trailID to get the trail
// * @return returns a TrailAverageRating object containing the trailID the ratingAvg (x.xx BigDecimal) and ratingCount (Integer)
// * @see TrailAverageRating
// */
//   @CrossOrigin
//   @ResponseStatus(HttpStatus.ACCEPTED)
//   @GetMapping(value = "/avg/{trailID}", produces = MediaType.APPLICATION_JSON_VALUE)
//   public TrailAverageRating getAverageReviewsForATrail(@RequestHeader("Authorization") String token, @PathVariable String trailID) {
//     tokenService.noTokenThrow(token);
//     return trailReviewService.getAverageReviewsForTrail(trailID);
//   }

  // Initialize and add the map
  initMap(lat: any, lng: any): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 15,
      center: {lat, lng},
    }
  );

  // creates a red pointer on the page
  const marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
  });
}

goToProfile(event: any){
  this._route.navigateByUrl("/profile/"+event.target.id);
}

filterSubject(subject: any){
  this.subject = subject;
  console.log(this.subject)
}

goToFlag(id: string){
  this._route.navigateByUrl('/trailpage/flag/'+id);
}

checkSubmitted(event: any){
  if(event){
    this.flag(document.getElementById(this._currRoute.firstChild?.snapshot.params['id']))
  } else {
    this.unflag(document.getElementById(this._currRoute.firstChild?.snapshot.params['id']))
    this._route.navigateByUrl('/trailpage');
  }
}

}
