import { Observable } from 'rxjs';
import { TrailFlag } from 'src/app/models/trailFlag';
import { NgForm, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimateTimings } from '@angular/animations';
import { TrailFlagService } from '../services/trail-flag.service';


@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

  constructor(private currRoute: ActivatedRoute, private _flagService: TrailFlagService, public router: Router) { }

  @Output() passSubmitStatus: EventEmitter<boolean> = new EventEmitter();
  displayFormSubmitError: boolean = false;
  submitted: boolean = false;
  time: string = '00:00'
  badDate: boolean = false;
  noUsers: boolean = false;

  trailFlagReq= {
    trail_id: '',
    user_id: '',
    date_int: 0,
  }

  returnFlags: TrailFlag[] =[];


  ngOnInit(): void {
    //Sets trail ID and user ID to trailFlagReq.
    this.trailFlagReq.trail_id = this.currRoute.firstChild?.snapshot.params['id'];
    this.trailFlagReq.user_id = localStorage.getItem('id')!;
  }

  ngOnDestroy(): void{
    this.passSubmitStatus.emit(this.submitted);
  }

  processForm(flagTrail: NgForm){
    if(flagTrail.form.status == 'VALID' && !this.badDate){
      let date = new Date(this.trailFlagReq.date_int+' '+this.time);
      this.trailFlagReq.date_int = Math.round(date.getTime()/(1000*60*60*24));
    // post request for flag
      this._flagService.postTrailFlag(this.trailFlagReq).subscribe((data:any)=>{
      console.log(data);
    })
      this.submitted = true;
    // gets flags for date and trail
      this._flagService.getAllFlagsByDateAndTrail(Math.round(date.getTime()/(1000*60*60*24)), this.trailFlagReq.trail_id).subscribe(
        (data:any)=>{ this.returnFlags = data;
          console.log(this.returnFlags);
        },
        (error: any)=> {
          this.noUsers = true;
          console.log(error);
        })
    } else {
    this.displayFormSubmitError = true;
  }
}

// Compares if entered date is before today or not.
compareDate(event: any){
  if((new Date(this.trailFlagReq.date_int+' '+this.time)) < (new Date())){
    this.badDate = true;
  } else {
    this.badDate = false;
  }
}





}
