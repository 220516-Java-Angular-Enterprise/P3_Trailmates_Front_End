import { TrailFlagService } from './../../services/trail-flag.service';
import { ImageDataService } from './../../services/image-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { NgForm } from '@angular/forms';
import { fade } from '../../animations/animations';
import { environment } from '../../../environments/environment.prod'
import { TrailFlag } from 'src/app/models/trailFlag';
// import { Trail } from '../models/trails';

@Component({
  selector: 'app-trail-history', 
  templateUrl: './trail-history.component.html',
  styleUrls: ['./trail-history.component.scss'],
  animations: [fade],
})

export class TrailHistoryComponent implements OnInit {
  comment: string = ""
  id: string | null = localStorage.getItem('id')
  selectedFiles: any = '';

  constructor(private trailhistory:TrailHistoryService, private _imageData: ImageDataService, private _trailFlag: TrailFlagService) {}

trailFlags: TrailFlag[] = [

]

  ngOnInit(): void {
    this._trailFlag.getAllByUser(localStorage.getItem('id')!).subscribe(
      data=>{this.trailFlags = data},
      error=>{console.log(error)}
    )
  }

historyReq = {
    trail_name: "",
    comment: "",
    date: '',
    imageURL: ""
  }

imageReq = {
  url: "",
  filetype: '',
}
displayFormSubmitError: boolean = false

image: any;

processForm(postForm: NgForm) {
  if(postForm.form.status == 'VALID'){
  const imageElement = document.getElementById("myFile") as HTMLInputElement;
  //Gets file from input
  const imageFile = imageElement.files![0];
  //Uploads file
  this.trailhistory.uploadFile(imageFile);
  //Gets image URL and saves it to historyReq
  this.historyReq.imageURL = environment.bucketURL + imageFile.name;
  this.historyReq.date = this.formatDate(new Date());
  // Make image req & Post
  this.imageReq.url = this.historyReq.imageURL;
  this.imageReq.filetype = 'HISTORY';
  this._imageData.saveImg(this.imageReq).subscribe(
    data => {console.log('Saved image successfully:' + data.url)}
  )
  // Make post request for history
  console.log(this.historyReq)
  this.trailhistory.insertNewHistory(this.historyReq).subscribe((data: any) =>{
    console.log('Saved post successfully: '+data)
  })
  }


}


isMenuOpen: boolean = false;

toggleMenu(){
  this.isMenuOpen = !this.isMenuOpen;
}

trailMenuState() {
  return this.isMenuOpen ? 'enter':'leave';
}

clickedOutsideMenu(): void {
  this.isMenuOpen = false;
}

// Trail Comment/Post Form 
// isFormOpen:boolean = true;

@Input() popup:boolean = true; 

@Output() doPassPopup:EventEmitter<any> = new EventEmitter();

close() {
  this.popup = false;
  this.doPassPopup.emit(this.popup);
}

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

selectTrail(trail: any){
  this.historyReq.trail_name = trail;
  console.log(trail);
  console.log(this.historyReq.trail_name)
}

}


