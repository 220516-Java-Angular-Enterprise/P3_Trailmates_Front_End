import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  // @Input() notifications: Notification[];
  @Input()
  notif!: Notification;
  @Output() onDeleteNotif: EventEmitter<Notification> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() goToMessage: EventEmitter<any> = new EventEmitter();
  @Output() goToProfile: EventEmitter<any> = new EventEmitter();
  @Output() goToTrail: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(notif: Notification){
    this.onDeleteNotif.emit(notif);
  }

  onClick(){
    this.clicked.emit(null)
  }

  goToMessages(convo_id: any){
  this.goToMessage.emit(convo_id);
  }

  goToProfiles(username: any){
    this.goToProfile.emit(username);
  }

  goToTrailPage(){
    this.goToTrail.emit();
  }

}
