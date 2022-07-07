import { Component, OnInit } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';

@Component({
  selector: 'app-trail-history',
  templateUrl: './trail-history.component.html',
  styleUrls: ['./trail-history.component.scss']
})
export class TrailHistoryComponent implements OnInit {

  constructor(private trailhistory:TrailHistoryService) { }

  ngOnInit(): void {
  }

}
