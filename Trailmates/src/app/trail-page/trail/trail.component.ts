import { TrailFlagService } from './../../services/trail-flag.service';
import { Trail } from './../../models/trail';
import { Component, Input, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { TrailFlag } from 'src/app/models/trailFlag';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {

  constructor(private _trailService: TrailService, private _userService: UserService, private _trailFlagService: TrailFlagService, private _route: Router){ }
  
  @Input()
  popup = false;

  fillColor = 'rgb(220,220,220)';
  
  filterTrail: Trail[] = [];
  allTrails: Trail[] = [];
  allUsers: User[] = [];
  filterUser: User[] = [];
  flagTrails: TrailFlag[] = []
  trail: Trail = {};
  long_desc: string = '';
  latitude: Number = 0;
  longitude: Number = 0;
  regex: RegExp = /(<([^>]+)>)/ig;
  subject: string = '';
  petsAllowed: string = '';

  ngOnInit(): void {
    this._trailService.getAllTrails().subscribe((data)=>{
      this.allTrails = data;
    })

    this._userService.getAllUsers().subscribe((data)=>{
      this.allUsers = data;
    })
    
    

  }

  // to toggle flag from blank to filled in on click
  flag(event: any) {
    // get trail_id of card and search if the user has it in their list
    // if they have it check date, if date is today or later then change color, else return

    var dateInt = new Date().getTime()/(1000*60*60*24)

    // event target may be trail id
    this._trailFlagService.getAllByDateAndName(dateInt, event?.target.id).subscribe((data) =>{
      this.flagTrails = data;
      console.log(this.flagTrails)
    })

    // need an if trail id is there then change flag color
    this.fillColor = `rgb(47,79,79)`;
  }

  friend(event: any) {


    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;

  }

  filterTrails(query: any){
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
  }else if (this.subject == 'users'){
    this.filterUser = [];
    this.allUsers.forEach((element)=>{
      if(element.username?.toLowerCase().includes(query.toLowerCase()) && !this.filterUser.includes(element)){
        this.filterUser.push(element);
      }
    })
  }
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

}
