import { UserService } from 'src/app/services/user-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  id: string | null = localStorage.getItem('id')
  public user: User = {id: "", username: "", password: "", email: "", role: "", bio: "", age: null}

  updateUserReq = {
    username: "",
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.id as string).subscribe((data:any) => {
      this.user = data
    })
  }

  
  processForm(updateProfileForm: NgForm) {
    this.user.username = this.updateUserReq.username
    console.log(this.user)

    this.userService.UpdateUser(this.user).subscribe(data =>{
      this.user = data
      console.log(this.user)
    })

    console.log("NNNEEEEWWWWW " + this.user.username)
  }

  @Input() popup:boolean = true; 

  @Output() doPassPopup:EventEmitter<any> = new EventEmitter();

  close() {
    this.popup = false;
    this.doPassPopup.emit(this.popup);
  } 

}
