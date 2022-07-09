import { getTestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()

  popup = false
  public trailhistory: TrailHistory = {id: "", comment: "",  date: new Date}
  public user: User = {}; 

  isLoggedIn: boolean = false;
  bio: any;
  username: any;

  id: string = ''
  
  constructor(public trailHistoryService:TrailHistoryService,private userservice:UserService,
  private router:Router, private http:HttpClient, private currRoute: ActivatedRoute) { }
   

  async ngOnInit() {
    this.currRoute.params.subscribe(p=>{
      this.id = p['id'];
      
      // this.userservice.getUserById(this.id).subscribe((data:any) => {
      //   this.user = data
        
      // })

      this.userservice.getUserById("56f4fe03-5359-4eb5-aa9c-8140caa1208d").subscribe((result)=>{
        console.log(result)
      })
      console.log(this.id)
      
    //   this.trailHistoryService.getHistoryDesc().subscribe((data:any) => {
    //     this.trailhistory = data
    //     console.log(this.trailhistory)
    // })
  })
}


}