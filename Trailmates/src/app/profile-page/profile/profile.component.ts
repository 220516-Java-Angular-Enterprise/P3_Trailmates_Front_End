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
  public trailHistory: TrailHistory[] = [];

  
  constructor(public trailHistoryService:TrailHistoryService, private interceptor:TokenInterceptorService, private userservice:UserService,
  private router:Router,private http:HttpClient, private currRoute: ActivatedRoute) { }
 
   



  id: string = ''
  
  async ngOnInit() {
    this.currRoute.params.subscribe(p=>{
      this.id = p['id'];
      this.userservice.getUserById(this.id).subscribe((data:any) => {
        this.user = data
      })
  
      this.trailHistoryService.getHistoryDesc().subscribe((data:any) => {
        this.trailhistory = data
        console.log(this.trailhistory)
    })
  })
}


}
