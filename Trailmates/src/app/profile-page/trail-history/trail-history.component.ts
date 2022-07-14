import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { TrailHistory } from 'src/app/models/trailHistory';
import { BehaviorSubject } from 'rxjs';
import { Trail } from 'src/app/models/trail';
import { User } from 'src/app/models/user'
import { NgForm } from '@angular/forms';
import { fade } from '../../animations/animations';
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
  bucketURL: string = ""

  constructor(private trailhistory:TrailHistoryService) { }

trails: Trail[] = [
  {
    id: "1",
    name: "Trail 1"
  }, 
  {
    id: "2",
    name: "Trail 2"
  }, 
  {
    id: "3",
    name: "Trail 3"
  }, 
  {
    id: "4",
    name: "Trail 4"
  }, 
  {
    id: "5",
    name: "Trail 5"
  }, 
]

  ngOnInit(): void {

  }

historyReq = {
        trail_name: "",
        comment: "",
        date: new Date
      }
displayFormSubmitError: boolean = false

processForm(postForm: NgForm) {
<<<<<<< HEAD
  //get image file as HTMLInputElement
  let imageElement = document.getElementById("myFile") as HTMLInputElement;
  //change input from HTMLInputElement to File
  let imageFile = imageElement?.files![0];
  //get secure url to s3 bucket from backend server, passing in the file's extension
  this.getSecureURL(imageFile.name.split('.').pop()!).then((stringPromise) => {this.bucketURL = stringPromise.toString()});
  //upload the image to S3 bucket
  this.trailhistory.uploadImage(this.bucketURL, imageFile);
  //get url to image
  let imageURL = this.bucketURL.split('?')[0];
  console.log(imageURL);



  // this.trailhistory.insertNewHistory(this.historyReq).subscribe((data: any) =>{
  //   console.log(data)
  // })
  
}

getSecureURL(fileType: String) {
  return this.trailhistory.getSecureURL(fileType!);
}
=======
  this.trailhistory.insertNewHistory(this.historyReq).subscribe(data =>{
    console.log(data)
  })
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





} 
>>>>>>> f5479050a005972bca3c7e5891ab31b41bab571b

