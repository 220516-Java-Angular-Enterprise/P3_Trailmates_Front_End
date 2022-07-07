import { Trail } from 'src/app/models/trail';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'app-dynamic-search',
  templateUrl: './dynamic-search.component.html',
  styleUrls: ['./dynamic-search.component.scss']
})
export class DynamicSearchComponent implements OnInit {

  constructor(private _trailService: TrailService) { }

  query: string = '';
  allTrail: Trail[] = [];
  filterTrail: Trail[] = [];

  ngOnInit(): void {
    this._trailService.getAllTrails().subscribe((data:any)=>{
      this.allTrail = data;
    })
  }

  filterTrails(){
  this.filterTrail = [];
  this.allTrail.forEach(trail=>{
    if(trail.name?.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()) && !this.filterTrail.includes(trail)){
      this.filterTrail.push(trail);
    }
  })

  }

  
}
