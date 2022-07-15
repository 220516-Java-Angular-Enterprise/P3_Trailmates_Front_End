import { UserService } from 'src/app/services/user-service.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  constructor(private userService: UserService, private authService: AuthService, private fb: FormBuilder) { }

  id: string | null = localStorage.getItem('id')
  
  updateUserReq = this.fb.group ({
    username: [null, [Validators.required, Validators.minLength(3)], this.authService.validateUsernameNotTaken.bind(this.authService)],
    password: ['', Validators.required],
  })
  
  get username() {
    return this.updateUserReq.get('username')
  }

  get password() {
    return this.updateUserReq.get('password')
  }

  public user: User = {id: "", username: "", password: "", email: "", role: "", bio: "", age: null}
  
  placeholders = {
    username: "Enter Username",
    password: "Enter Password",
  }

  ngOnInit(): void {
    this.userService.getUserById(this.id as string).subscribe((data:any) => {
      this.user = data
      console.log(this.user)
    })
    
  }

  displayFormSubmitError: boolean = false;
  
  onSubmit() {
    console.log(this.user)
    this.user.username = this.updateUserReq.get('username')?.value as unknown as string
    this.user.password = this.updateUserReq.get('password')?.value as unknown as string

    if(this.updateUserReq.status == 'VALID'){
      this.userService.UpdateUser(this.user).subscribe(data =>{
        this.user = data
        console.log(this.user)
      })
    }else{
      this.displayFormSubmitError = true
    }
    
    console.log("NNNEEEEWWWWW " + this.user.username)
    
  }

  @Input() popup:boolean = true; 

  @Output() doPassPopup:EventEmitter<any> = new EventEmitter();

  close() {
    this.popup = false;
    this.doPassPopup.emit(this.popup);
  } 

}