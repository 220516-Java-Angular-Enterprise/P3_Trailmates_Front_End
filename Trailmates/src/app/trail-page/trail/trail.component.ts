import { Trail } from './../../models/trail';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'trail',  //first attribute. name for our custom html. You can use it in any html page
  templateUrl: './trail.component.html', //html that is responsible in rendering 
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
    if(element.name?.toLowerCase().includes(query.toLowerCase()) && !this.filterTrail.includes(element)){
      this.filterTrail.push(element);
    }
  })
  }

}
