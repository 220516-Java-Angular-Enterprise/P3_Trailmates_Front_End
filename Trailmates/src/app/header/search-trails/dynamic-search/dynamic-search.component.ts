import { Trail } from 'src/app/models/trail';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'app-dynamic-search',
  templateUrl: './dynamic-search.component.html',
  styleUrls: ['./dynamic-search.component.scss']
})
export class DynamicSearchComponent implements OnInit {

  constructor(private _trailService: TrailService) { }
  // @Input()
  // query!: string;
  @Output() passQuery: EventEmitter<String> = new EventEmitter<String>();
  query: string = '';

  ngOnInit(): void {
  }

  getQuery(query:string){
  this.passQuery.emit(query)
  }

  
}
