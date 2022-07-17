import { TrailService } from 'src/app/services/trail.service';
import { getTestBed } from '@angular/core/testing';
import { fromEventPattern, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrailHistory } from 'src/app/models/trailHistory';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { UserService } from 'src/app/services/user-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import { User } from 'src/app/models/user';
import { TrailHistoryComponent } from '../trail-history/trail-history.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {

  updateProfilePopup = false
  updateProfileImage = false;
  popup:boolean = false

  public trailhistory: TrailHistory[] = []
  public noPosts: string = ""
  public user: User = {id: "", username: "", password: "", email: "", role: "", bio: "", age: null}

  //user that views others profile
  public viewerUser: User = {id: "", username: "", password: "", email: "", role: "", bio: "", age: null}

  public allUsers: User[] = [];
  public trailNames: string[] = []

  isLoggedIn: boolean = false;
  username: any;
  bio: any;
  map = new Map<string, number>(); 
  trailNameCount = 0

  id: string | null = localStorage.getItem('id')
  
  constructor(public trailHistoryService:TrailHistoryService,private userservice:UserService, private trailHistoryComp:TrailHistoryComponent,
  private router:Router, private http:HttpClient, private currRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.currRoute.params.subscribe(p => {
      this.username = p['username']
      
      //converts null to string
      this.userservice.getUserByUsername(this.username as string).subscribe((data:any) => {
        this.viewerUser = data

        this.trailHistoryService.getHistoryAsc(this.viewerUser.id as string).subscribe((data)=>{
          this.trailhistory = data;
        })
      })

    this.userservice.getUserById(this.id as string).subscribe((data:any) => {
      this.user = data
      console.log(this.user)
    })

    }
  )}

  refreshPosts(){
    this.trailHistoryService.getHistoryAsc(this.viewerUser.id as string).subscribe((data)=>{
      this.trailhistory = data;
    })
  }

  refreshUser(){
  this.userservice.getUserByUsername(this.username as string).subscribe((data:any) => {
    this.viewerUser = data
    console.log(this.user)
  })
  }

close(event:any){
  this.popup = event;
  this.updateProfilePopup = event;
  this.updateProfileImage = event;
  this.refreshPosts()
  this.refreshPosts()
  this.refreshUser()
  // this.refreshUser()
} 
}

// this.userservice.getAllUsers().subscribe((data:any) => {
//   this.allUsers = data

//   //loop through all users
// for(let i = 0; i < this.allUsers.length; i++){
//   //get trail history for each user
//   this.username = this.allUsers[i].username
//   this.trailHistoryService.getHistoryAsc((this.allUsers[i].id || '').toString()).subscribe((data:any) =>{
//     //loop through all histories of user
//     this.trailhistory = data
//     for(let j = 0; j < this.trailhistory.length; j++){
//       //get trail names from each users history
//       //console.log("TRRAAAAIILLNNAAMMEEE " + this.username + " " + this.trailhistory[j].trailName)

//       //set key in map to trailname
//       //if map contains trailname increment value by 1
//       //else add trail name to map and set value to 1
//       if(this.map.has((this.trailhistory[j].trailName || '').toString())){
//         this.map.set((this.trailhistory[j].trailName || '').toString(), this.trailNameCount++)
//       }else{
//         this.map.set((this.trailhistory[j].trailName || '').toString(), 1)
//       }
      
//     }

//     this.map.forEach((value: number, key: string) => {
//       console.log(key, value);
//  })
    
//   })
// }



// })
