import { Component, OnInit } from '@angular/core';
import { fade } from '../animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  // showNotifs: boolean = false;
  // showUserMenu: boolean = false;

  isNotifOpen: boolean = false

  toggleNotifMenu(): void {
    this.isNotifOpen = !this.isNotifOpen;
  }

  clickedOutsideNotif(): void {
    this.isNotifOpen = false;
  }

  isUserMenuOpen: boolean = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  
  clickedOutsideUser(): void {
    this.isUserMenuOpen = false;
  }

  ngOnInit(): void {}
}
