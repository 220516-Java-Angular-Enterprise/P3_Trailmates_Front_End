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

  isNotifOpen: boolean = false

  toggleNotifMenu(): void {
    this.isNotifOpen = !this.isNotifOpen;
  }

  notifState() {
    return this.isNotifOpen ? 'enter' : 'leave';
  }

  clickedOutsideNotif(): void {
    this.isNotifOpen = false;
  }

  isUserMenuOpen: boolean = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
   
  }
  
  userMenuState() {
    return this.isUserMenuOpen ? 'enter':'leave';
  }

  clickedOutsideUser(): void {
    this.isUserMenuOpen = false;
  }

  notify = false;
  count = 0;

  onSendClick() {
    this.count++;
    this.notify = true;
    setTimeout(() => {this.notify = false;}, 300
    );
  }

  ngOnInit(): void {}
}

