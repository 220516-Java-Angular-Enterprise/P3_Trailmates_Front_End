import { Component, OnInit } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { TrailHistory } from 'src/app/models/trailHistory';
import { BehaviorSubject } from 'rxjs';
import { Trail } from 'src/app/models/trail';
import { User } from 'src/app/models/user'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trail-history', 
  templateUrl: './trail-history.component.html',
  styleUrls: ['./trail-history.component.scss']
})

export class TrailHistoryComponent implements OnInit {

  id: string | null= localStorage.getItem('id')

  constructor(private trailhistory:TrailHistoryService) { }

  ngOnInit(): void {

  }
  trail: Trail = {
    id: '61C3D5EA-F2F7-419F-89B2-B743626A4D26'
  }
  user: User = {
    id: '56f4fe03-5359-4eb5-aa9c-8140caa1208d'
  }
  postHistory(){
    let historyReq: TrailHistory = {
      comment: "my comment",
      date: new Date,
      
    }

    this.trailhistory.insertNewHistory(historyReq)
    console.log(historyReq)
    console.log(this.id)
  }

  
  
}
