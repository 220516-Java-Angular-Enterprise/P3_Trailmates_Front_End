// import { TrailFlagReq } from './../models/dto/trailFlagReq';
import { TrailFlag } from 'src/app/models/trailFlag';
import { NgForm, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimateTimings } from '@angular/animations';
import { TrailFlagService } from '../services/trail-flag.service';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

  constructor(private currRoute: ActivatedRoute, private _flagService: TrailFlagService) { }

  displayFormSubmitError: boolean = false;
  submitted: boolean = false;

  trailFlagReq= {
    trail_id: '',
    user_id: '',
    date_int: 0,
  }
  dateInt = new Date().getTime()/(1000*60*60*24); //an integer representing current date as a normalized number of days
  time: string = '00:00'

  ngOnInit(): void {
    this.trailFlagReq.trail_id = this.currRoute.firstChild?.snapshot.params['id'];
    this.trailFlagReq.user_id = localStorage.getItem('id')!;
  }

  processForm(flagTrail: NgForm){
    if(flagTrail.form.status == 'VALID'){
      let date = new Date(this.trailFlagReq.date_int+' '+this.time);
      this.trailFlagReq.date_int = date.getTime()/(1000*60*60*24);
      this._flagService.postTrailFlag(this.trailFlagReq).subscribe((data:any)=>{
      console.log(data);
      this.submitted = true;
    })
    } else {
    this.displayFormSubmitError = true;
  }
}



}
