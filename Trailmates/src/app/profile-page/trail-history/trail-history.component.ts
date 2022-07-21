import { TrailFlagService } from './../../services/trail-flag.service';
import { ImageDataService } from './../../services/image-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { NgForm } from '@angular/forms';
import { fade } from '../../animations/animations';
import { environment } from '../../../environments/environment.prod';
import { TrailFlag } from 'src/app/models/trailFlag';
import { ImageData } from 'src/app/models/imageData';
// import { Trail } from '../models/trails';

@Component({
  selector: 'app-trail-history',
  templateUrl: './trail-history.component.html',
  styleUrls: ['./trail-history.component.scss'],
  animations: [fade],
})
export class TrailHistoryComponent implements OnInit {
  @Input() popup: boolean = true;
  @Output() doPassPopup: EventEmitter<any> = new EventEmitter();

  constructor(
    private trailhistory: TrailHistoryService,
    private _imageData: ImageDataService,
    private _trailFlag: TrailFlagService
  ) {}

  comment: string = '';
  id: string | null = localStorage.getItem('id');
  username = localStorage.getItem('username');
  selectedFiles: any = '';
  trailFlags: TrailFlag[] = [];
  formError: boolean = false;
  isMenuOpen: boolean = true;
  historyReq = {
    trail_name: '',
    comment: '',
    date: '',
    imageURL: '',
  };
  imageReq = {
    url: '',
    filetype: '',
  };
  displayFormSubmitError: boolean = false;
  postImage: any;
  profileImage: ImageData = {};

  ngOnInit(): void {
    this._trailFlag.getAllByUser(localStorage.getItem('id')!).subscribe(
      (data) => {
        this.trailFlags = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this._imageData
      .getLatestProfilePic(localStorage.getItem('id') as string)
      .subscribe((data) => {
        this.profileImage = data;
      });
  }

  async processForm(postForm: NgForm) {
    if (postForm.form.status == 'VALID') {
      const imageElement = document.getElementById(
        'myFile'
      ) as HTMLInputElement;
      //Gets file from input
      const imageFile = imageElement.files![0];
      //Uploads file
      this._imageData.uploadFile(imageFile);
      //Gets image URL and saves it to historyReq
      this.historyReq.imageURL = environment.bucketURL + imageFile.name;
      this.historyReq.date = this.formatDate(new Date());
      // Make image req & Post
      this.imageReq.url = this.historyReq.imageURL;
      this.imageReq.filetype = 'HISTORY';
      await this._imageData.saveImg(this.imageReq).subscribe((data) => {
        console.log('Saved image successfully:' + data.url);
        // Make post request for history
         this.makePost();
        console.log(this.historyReq);
      });
      //Closes modal
    } else {
      this.formError = true;
    }
  }

  makePost() {
    this.trailhistory.insertNewHistory(this.historyReq).subscribe(
      (data: any) => {
        //rest valse
        this.historyReq.trail_name = '';
        this.historyReq.comment = ' ';
        this.close();
        console.log('Saved post successfully: ' + data);
      },
      (error: any) => {
        this.makePost();
      }
    );
  }

  clickedOutsideMenu(): void {
    this.isMenuOpen = false;
  }

  close() {
    this.popup = false;
    this.doPassPopup.emit(this.popup);
  }

  // Date formatting to back-end
  private formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  selectTrail(event: any) {
    this.historyReq.trail_name = event.target.value;
    console.log(this.historyReq.trail_name);
  }
  
}
