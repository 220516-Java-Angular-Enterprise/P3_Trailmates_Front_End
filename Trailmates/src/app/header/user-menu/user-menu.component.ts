import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(private route: Router, private auth: AuthService) { }

  loggedIn:boolean = false;

  ngOnInit(): void {
  }

  login(){
    this.loggedIn =! this.loggedIn;
  }

  logout(){
    this.auth.logoutUser();
  }

  goToMessages(){
    this.route.navigateByUrl("/messaging/"+localStorage.getItem("id"))
  }

}
