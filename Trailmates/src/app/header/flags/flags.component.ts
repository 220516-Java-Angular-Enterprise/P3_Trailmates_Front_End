import { TrailFlag } from './../../models/trailFlag';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent implements OnInit {
  @Input() trailFlags: TrailFlag[] = [];
  @Output() passDeleteFlag: EventEmitter<TrailFlag> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteFlag(flag: TrailFlag){
    this.passDeleteFlag.emit(flag);
  }

  

}
