import { ImageDataService } from './../../../services/image-data.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-update-profile-image',
  templateUrl: './update-profile-image.component.html',
  styleUrls: ['./update-profile-image.component.scss']
})
export class UpdateProfileImageComponent implements OnInit {
  @Input() popup:  boolean | undefined;
  @Output() doPassPopup: EventEmitter<any> = new EventEmitter();
  displayFormSubmitError: boolean = false;

  constructor(private _imgDataService: ImageDataService,) {}

  ngOnInit(): void {
  }

imageReq = {
  url: "",
  filetype: 'PROFILE',
}

  onSubmit(postForm: NgForm){
  if(postForm.form.status == 'VALID'){
    const imageElement = document.getElementById(
      'profileImage'
    ) as HTMLInputElement;
    //Gets file from input
    const imageFile = imageElement.files![0];
    // Upload File
    this._imgDataService.uploadFile(imageFile);
    // Gets image URL and saves to image req & post 
    this.imageReq.url = environment.bucketURL+imageFile.name;
    this._imgDataService.saveImg(this.imageReq).subscribe(
      data=>{console.log('Saved image in DB:'+data.url)}
    )
    this.close();
  }else {
    this.displayFormSubmitError = true;
  }
  }
  
  image: any

  change(event: any){
    console.log(event)
  }

  close(){
    this.popup = false;
    this.doPassPopup.emit(this.popup);
  }

}
