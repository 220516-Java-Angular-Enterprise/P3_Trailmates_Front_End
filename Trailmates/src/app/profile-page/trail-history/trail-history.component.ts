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
  comment: string = ""
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

historyReq = {
        trail_name: "",
        comment: "",
        date: new Date,
      }
displayFormSubmitError: boolean = false

processForm(postForm: NgForm) {
  this.trailhistory.insertNewHistory(this.historyReq).subscribe(data =>{
    console.log(data)
  })
 
}


}