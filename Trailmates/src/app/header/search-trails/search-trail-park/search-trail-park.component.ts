import { Trail } from 'src/app/models/trail';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'app-search-trail-park',
  templateUrl: './search-trail-park.component.html',
  styleUrls: ['./search-trail-park.component.scss']
})
export class SearchTrailParkComponent implements OnInit {

  constructor(private _trailService: TrailService) { }
  query: string = ''
  trails$!: Observable<Trail[]>

  ngOnInit(): void {
  }

  filterSearchByPark(){
    this.trails$ = this._trailService.getByPark(this.query)
  }
}
