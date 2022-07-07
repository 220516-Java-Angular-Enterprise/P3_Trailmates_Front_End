import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // to toggle flag from blank to filled in on click
  change() {
    // document.getElementById("flagButtonFill").d="";
  }


}
