import { NgForm } from '@angular/forms';
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

  trailFlagReq ={
    trail_id: '',
    user_id: '',
    date_int: '',
  }
  dateInt = new Date().getTime()/(1000*60*60*24); //an integer representing current date as a normalized number of days


  ngOnInit(): void {
    this.trailFlagReq.trail_id = this.currRoute.firstChild?.snapshot.params['id'];
    this.trailFlagReq.user_id = localStorage.getItem('id')!;

  this._flagService.getFlagById('someid').subscribe((data:any) =>{
  console.log(data);

});
  }

  processForm(flagTrail: NgForm){
    if(flagTrail.form.status == 'VALID'){
    this._flagService.postTrailFlag(this.trailFlagReq).subscribe((data:any)=>{
      console.log(data);
      this.submitted = true;
    })
    } else {
    this.displayFormSubmitError = true;
  }
}



}
