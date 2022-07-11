import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../animations/animations';
import {NotificationService} from './notifications/notifications-service/notification.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  isNotifOpen: boolean = false

  notify = false;
  count = 0;

  toggleNotifMenu(): void {
    this.isNotifOpen = !this.isNotifOpen;
    this.count= 0;
    // this.notifCount= 0;
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

  // Notification Emulator
  addNotif() {
    this.count++;
    this.notify = true;
  }

  ngOnInit(): void {
  }
}

