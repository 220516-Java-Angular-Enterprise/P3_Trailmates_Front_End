import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private currRoute: ActivatedRoute) { }

  id: string = ''
  ngOnInit(): void {
    this.currRoute.params.subscribe(p=>{
      this.id = p['username'];
    })
  }

}
