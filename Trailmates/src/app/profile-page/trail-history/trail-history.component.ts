import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { TrailHistory } from 'src/app/models/trailHistory';
import { BehaviorSubject } from 'rxjs';
import { Trail } from 'src/app/models/trail';
import { User } from 'src/app/models/user'
import { NgForm } from '@angular/forms';
import { fade } from '../../animations/animations';
// import { Trail } from '../models/trails';

@Component({
  selector: 'app-trail-history', 
  templateUrl: './trail-history.component.html',
  styleUrls: ['./trail-history.component.scss'],
  animations: [fade],
})

export class TrailHistoryComponent implements OnInit {
  comment: string = ""
  id: string | null = localStorage.getItem('id')

  constructor(private trailhistory:TrailHistoryService) { }

trails: Trail[] = [
  {
    id: "1",
    name: "Trail 1"
  }, 
  {
    id: "2",
    name: "Trail 2"
  }, 
  {
    id: "3",
    name: "Trail 3"
  }, 
  {
    id: "4",
    name: "Trail 4"
  }, 
  {
    id: "5",
    name: "Trail 5"
  }, 
]

  ngOnInit(): void {

  }

historyReq = {
        trail_name: "",
        comment: "",
        date: new Date
      }
displayFormSubmitError: boolean = false

processForm(postForm: NgForm) {
  this.trailhistory.insertNewHistory(this.historyReq).subscribe(data =>{
    console.log(data)
  })
}

isMenuOpen: boolean = false;

toggleMenu(){
  this.isMenuOpen = !this.isMenuOpen;
}

trailMenuState() {
  return this.isMenuOpen ? 'enter':'leave';
}

clickedOutsideMenu(): void {
  this.isMenuOpen = false;
}

@Input() popup:boolean = true; 

@Output() doPassPopup:EventEmitter<any> = new EventEmitter();

close() {
  this.popup = false;
  this.doPassPopup.emit(this.popup);
} 

} 


