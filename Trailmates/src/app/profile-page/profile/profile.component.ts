import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrailHistoryService } from 'src/app/services/trail-history.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
