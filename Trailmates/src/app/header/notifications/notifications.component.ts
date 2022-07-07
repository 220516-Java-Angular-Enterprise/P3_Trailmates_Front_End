import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Notification } from 'src/app/models/notification';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotifiationsComponent implements OnInit {

  constructor(private route: Router) { }


  notifications: Notification[] = [
    {
      id: "1",
      message: "message1",
    },
    {
      id: "2",
      message: "message1",
    },
    {
      id: "3",
      message: "message1",
    },
    {
      id: "4",
      message: "message1",
    }
  ]

  ngOnInit(): void {
    console.log("i was born")
    this.notifications = this.notifications;
  }

  deleteNotif(notif: Notification){
    console.log("deleting notifcation #" + notif.id+"...");
  }

  onClick(){
    console.log("I was clicked!")
  }

  
  ngOnDestroy() {
    console.log("I was destroyed.")
  }

  goToMessages(){
    this.route.navigateByUrl("/messaging/"+localStorage.getItem('id'));
  }

}
