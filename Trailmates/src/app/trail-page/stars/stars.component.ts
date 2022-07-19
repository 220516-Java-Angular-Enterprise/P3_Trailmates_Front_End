import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
  providers: [
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>StarsComponent),
      multi: true
    }
  ]
})
export class StarsComponent implements OnInit, ControlValueAccessor {


  constructor() { }

  value: any= {};
  
  writeValue(obj: any): void {
    this.rating = obj;
    console.log(obj)
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn ;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onChange!: (rating:number) =>  0;

  setRating(){
    this.value = !this.value;
    this.onChange(this.value)
  }

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
  }

}
