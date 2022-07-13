import { TrailService } from 'src/app/services/trail.service';
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
import { TrailHistoryComponent } from '../trail-history/trail-history.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()

  popup = false
  public trailhistory: TrailHistory[] = []
  public noPosts: string = ""
  public user: User = {id: "", username: "", password: "", email: "", role: "", bio: "", age: null}

  isLoggedIn: boolean = false;
  username: any;
  bio: any;

  id: string | null = localStorage.getItem('id')
  constructor(public trailHistoryService:TrailHistoryService,private userservice:UserService, private trailHistoryComp:TrailHistoryComponent,
  private router:Router, private http:HttpClient, private currRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.currRoute.params.subscribe(p => {
      this.username = p['username']
      

      console.log("IT WOOORKKKRKKRKSSS " + this.bio)
      //converts null to string
      this.userservice.getUserById((this.id || '').toString()).subscribe((data:any) => {
        this.user = data
        console.log(this.user)
      })
      console.log(localStorage.getItem('id'))


      this.trailHistoryService.getHistoryAsc().subscribe((data)=>{
        this.trailhistory = data;
        console.log(this.trailhistory)

        if(this.trailhistory.length == 0){
          console.log("You don't have any posts")
        }else{
          console.log("You have posts")
        }
      })

      

      
  })
}



}