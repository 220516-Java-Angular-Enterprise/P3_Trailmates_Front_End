<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
=======
import { PrivateMessage } from './../../../../models/privateMessage';
import { Component, Input, OnInit } from '@angular/core';
>>>>>>> 33f349d18ff7e1b057094f109af2494cf1ef9a87

@Component({
  selector: 'app-private-message',
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss']
})
export class PrivateMessageComponent implements OnInit {
  username = 'username';
  messages: any[] | undefined;
  message = 'hi';
  constructor(private http: HttpClient) { }

  @Input() message: PrivateMessage = {};

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('02505fbfb47bd66f2994', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      alert(JSON.stringify(data));
    });
  }

  submit(): void {
    // this.http.post("link", body:{
    //   username: this.username,
    //   message: this.message
    // }).subscribe(() => this.message = '');

  }

}


