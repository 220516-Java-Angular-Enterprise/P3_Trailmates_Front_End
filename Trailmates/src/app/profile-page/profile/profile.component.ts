import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrailHistory } from 'src/app/models/trailHistory';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()

  popup = false
  public trailHistory: TrailHistory[] = [];

  
  constructor(public trailHistoryService:TrailHistoryService,private userservice:UserService,
  private router:Router,http:HttpClient, private currRoute: ActivatedRoute) { }
   



  id: string = ''
  ngOnInit(): void {
    this.currRoute.params.subscribe(p=>{
      this.id = p['username'];
    })

  }

  
}
