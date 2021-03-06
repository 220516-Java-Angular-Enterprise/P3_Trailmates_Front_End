import { Conversation } from 'src/app/models/conversation';
import { OwnedCoversation } from 'src/app/models/ownedCoversations';
import { User } from './../models/user';
import { Observable } from 'rxjs';
import { TrailFlag } from 'src/app/models/trailFlag';
import { NgForm, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimateTimings } from '@angular/animations';
import { TrailFlagService } from '../services/trail-flag.service';
import { MessagesService } from '../services/messages.service';


@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
})
export class CalendarModalComponent implements OnInit {
  constructor(
    private currRoute: ActivatedRoute,
    private _flagService: TrailFlagService,
    private _currRoute: ActivatedRoute,
    public router: Router,
    private _messageService: MessagesService
  ) {}

  @Output() passSubmitStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() passTrailFlagReq: EventEmitter<any> = new EventEmitter<any>();

  displayFormSubmitError: boolean = false;
  submitted: boolean = false;
  time: string = '00:00';
  badDate: boolean = false;
  noUsers: boolean = false;

  trailFlagReq = {
    trailId: '',
    // user_id: '',
    dateInt: 0,
  };

  returnFlags: TrailFlag[] = [];

  ngOnInit(): void {
    //Sets trail ID and user ID to trailFlagReq.
    this.trailFlagReq.trailId =
      this.currRoute.firstChild?.snapshot.params['id'];
    // this.trailFlagReq.user_id = localStorage.getItem('id')!;
  }

  ngOnDestroy(): void {
    this.passSubmitStatus.emit(this.submitted);
  }

  processForm(flagTrail: NgForm) {
    if (flagTrail.form.status == 'VALID' && !this.badDate) {
      let date = new Date(this.trailFlagReq.dateInt + ' ' + this.time);
      this.trailFlagReq.dateInt = Math.round(
        date.getTime() / (1000 * 60 * 60 * 24)
      );
      // post request for flag
      this._flagService
        .postTrailFlag(this.trailFlagReq)
        .subscribe((data: any) => {
          console.log(data);
        });
      this.submitted = true;
      // gets flags for date and trail
      this._flagService
        .getAllFlagsByDateAndTrail(
          Math.round(date.getTime() / (1000 * 60 * 60 * 24)),
          this.trailFlagReq.trailId
        )
        .subscribe(
          (data: any) => {
            this.returnFlags = data;
            console.log(this.returnFlags);
          },
          (error: any) => {
            this.noUsers = true;
            console.log(error);
          }
        );
    } else {
      this.displayFormSubmitError = true;
    }
  }

  goToProfile(event: any) {
    this.router.navigateByUrl('/profile/' + event.target.id);
    console.log('pro one ' + event.target.id);
  }

  goToMessage(user: User) {
    let ownedConvo: OwnedCoversation[] = [];
    let convo: Conversation = {
      id: '',
      name: '',
    };
    //Gets existing convos
    this._messageService.getExistingConvos().subscribe((data) => {
      ownedConvo = data;
      ownedConvo.forEach((owned) => {
        //Checks if convo by naming convention exists already
        if (
          owned.conversation?.name ==
          `${user.username!}:${localStorage.getItem('username')}`
        ) {
          //Sets it equal to convo to compare.
          convo = owned.conversation;
          console.log('Happen 1');
        } else if (
          owned.conversation?.name ==
          `${localStorage.getItem('username')}:${user.username!}`
        ) {
          convo = owned.conversation;
          console.log('Happen 2');
        }
      });
      //If convo id is still == '', meaning that the convo name did exist already.
      if (convo.id !== '') {
        this.router.navigateByUrl('messaging/groupchat/' + convo.id);
        console.log('No new convos made.');
      } else if (convo.id === '') {
        //Else creates new convo based on this n  aming convention.
        let convoReq = {
          conversationName:
            user.username + ':' + localStorage.getItem('username'),
          userIDs: [user.id],
        };
        let convoId = '';
        this._messageService.createNewGroup(convoReq).subscribe((data) => {
          convoId = data.id;
          this.router.navigateByUrl('/messaging/groupchat/' + convoId);
          console.log('New convo was made.');
        });
      }
    });
  }

  // Compares if entered date is before today or not.
  compareDate(event: any) {
    if (new Date(this.trailFlagReq.dateInt + ' ' + this.time) < new Date()) {
      this.badDate = true;
    } else {
      this.badDate = false;
    }
  }
}
