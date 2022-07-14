import { Component, OnInit } from '@angular/core';
import { TrailHistoryService } from 'src/app/services/trail-history.service';
import { TrailHistory } from 'src/app/models/trailHistory';
import { BehaviorSubject } from 'rxjs';
import { Trail } from 'src/app/models/trail';
import { User } from 'src/app/models/user'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trail-history', 
  templateUrl: './trail-history.component.html',
  styleUrls: ['./trail-history.component.scss']
})

export class TrailHistoryComponent implements OnInit {
  comment: string = ""
  id: string | null = localStorage.getItem('id')
  bucketURL: string = ""

  constructor(private trailhistory:TrailHistoryService) { }

  ngOnInit(): void {

  }

historyReq = {
        trail_name: "",
        comment: "",
        date: new Date
      }
displayFormSubmitError: boolean = false

processForm(postForm: NgForm) {
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

}