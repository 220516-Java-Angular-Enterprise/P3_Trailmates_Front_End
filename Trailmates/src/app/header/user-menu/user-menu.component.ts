import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor() { }

  loggedIn:boolean = false;

  ngOnInit(): void {
  }

  login(){
    this.loggedIn =! this.loggedIn;
  }

  logout(){
    this.loggedIn =! this.loggedIn;
  }

}
