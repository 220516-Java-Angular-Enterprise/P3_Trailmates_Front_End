import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { TrailHistory } from 'src/app/models/trailHistory';
import { BehaviorSubject } from 'rxjs';
import { Trail } from 'src/app/models/trail';
import { User } from 'src/app/models/user'
import { NgForm } from '@angular/forms';
import { fade } from '../../animations/animations';
import { BucketURL } from 'src/app/models/bucketurl';
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
  bucketURL: BucketURL = {
    url: ""
  }

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

image: any;

processForm(postForm: NgForm) {
  //get image file as HTMLInputElement
  let imageElement = document.getElementById("myFile") as HTMLInputElement;
  //change input from HTMLInputElement to File
  let imageFile = imageElement?.files![0];
  this.image = imageFile;
  //get secure url to s3 bucket from backend server, passing in the file's extension
  this.trailhistory.getSecureURL(imageFile.name.split('.').pop()!).then((stringPromise) => {
    this.bucketURL = stringPromise;
    console.log("aws URL: " + this.bucketURL.url);
    //upload the image to S3 bucket
    this.trailhistory.uploadImage(this.bucketURL.url!, imageFile).subscribe(response => {
      console.log(response);
    });
    //get url to image
    let imageURL = this.bucketURL.url!.split('?')[0];
    // console.log(imageURL);
  })

  // this.trailhistory.uploadImage("https://trailmates-images.s3.amazonaws.com/6a5f86f2-d7aa-4c97-89aa-52af219ac357.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220715T212057Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIATSTKADK3AQ7PYDNZ%2F20220715%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7ed1a5b6dc5dfe1cfdadaa726872039faf01735c6d0f5a6d520a8ae27121f814", imageFile);

  // this.trailhistory.insertNewHistory(this.historyReq).subscribe((data: any) =>{
  //   console.log(data)
  // })

}

getSecureURL(fileType: String) {
  return this.trailhistory.getSecureURL(fileType!);
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


