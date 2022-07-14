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
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {

  constructor(private _trailService: TrailService, private _friendService: FriendService, private _userService: UserService, private _trailFlagService: TrailFlagService, private _route: Router, private _currRoute: ActivatedRoute){ }
  
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
  friends: any = {};
  noUsers: boolean =false;
  time: string='00:00';

  trailFlagReq= {
    trail_id: '',
    user_id: '',
    date_int: 0,
  }

  returnFlags: TrailFlag[] =[];


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

  // needs to also render user comments
  showTrailDetails(event: any) {
    this._trailService.getById(event.target.id).subscribe((data: any) => {
      this.trail = data
      this.trail.long_desc = this.trail.long_desc!.replace(this.regex, "")
      this.latitude = +this.trail.latitude!;
      this.longitude = +this.trail.longitude!;
    
      // This is the functionality for the google map
      this.initMap(this.latitude, this.longitude)
    })
    }

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

checkTrailReq(event: any){
  // gets flags for date and trail
  let date = new Date(this.trailFlagReq.date_int+' '+this.time);
    this._trailFlagService.getAllFlagsByDateAndTrail(Math.round(date.getTime()/(1000*60*60*24)), this.trailFlagReq.trail_id).subscribe(
      (data:any)=>{ this.returnFlags = data;
        console.log(this.returnFlags);
      },
      (error: any)=> {
        this.noUsers = true;
        console.log(error);
      })
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
