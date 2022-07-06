import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification';

@Component({
  selector: 'app-notifiations',
  templateUrl: './notifiations.component.html',
  styleUrls: ['./notifiations.component.scss']
})
export class NotifiationsComponent implements OnInit {

  constructor() { }

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

  variable: string = "pizza";

  ngOnInit(): void {
  }

}
