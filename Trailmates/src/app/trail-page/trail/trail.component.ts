import { Trail } from './../../models/trail';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';
// import { ConsoleReporter } from 'jasmine';

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
  trail: Trail = {};


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

  showTrailDetails(event: any) {
    this._trailService.getById(event.target.id).subscribe((data: any) => {
      this.trail = data
      console.log(this.trail.long_desc?.split("<*>"));
    })
  }
}
