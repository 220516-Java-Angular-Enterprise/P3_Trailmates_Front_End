import { Trail } from './../../models/trail';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {

  constructor(private _trailService: TrailService){ }
  
  filterTrail: Trail[] = [];
  allTrails: Trail[] = [];
  Query: string = '';
  ngOnInit(): void {
    this._trailService.getAllTrails().subscribe((data)=>{
      this.allTrails = data;
    })
  }

  // to toggle flag from blank to filled in on click
  change() {
    // document.getElementById("flagButtonFill").d="";
  }

  filterTrails(query: any){
  this.filterTrail = [];
  this.allTrails.forEach(element =>{
    if(element.name?.toLowerCase().includes(query) && !this.filterTrail.includes(element)){
      this.filterTrail.push(element);
    }
  })
  }

}
