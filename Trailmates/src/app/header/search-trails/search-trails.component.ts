import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';
import { Trail } from 'src/app/models/trail';

@Component({
  selector: 'app-search-trails',
  templateUrl: './search-trails.component.html',
  styleUrls: ['./search-trails.component.scss']
})
export class SearchTrailsComponent implements OnInit {

  trails$!: Observable<Trail[]>;
  query: string = '';
  
  constructor(private _trailService: TrailService) { }


  ngOnInit(): void {

  }

  filterSearchByName(){
    this.trails$ = this._trailService.getByName(this.query);
  }




}
