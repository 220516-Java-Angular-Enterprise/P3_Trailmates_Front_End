
import { PrivateMessage } from './../../../../models/privateMessage';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss']
})
export class PrivateMessageComponent implements OnInit {

  constructor() { }

  @Input() message: PrivateMessage = {};

  ngOnInit(): void {

  }

}


