import { Component, forwardRef, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit{


  constructor() { }

  @Output() bigClick: EventEmitter<number> = new EventEmitter();
  

  onTouch(){

  }


  getRating() {
    return this.rating;
  }

  ngOnInit(): void {
  }

  title = "star-angular";
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;

  enter(i: any) {
    this.hoverState = i;
  }

  leave(event: any) {
    this.hoverState = 0;
  }

  updateRating(i:any) {
    this.rating = i;
    this.bigClick.emit(this.rating);
  }

}
