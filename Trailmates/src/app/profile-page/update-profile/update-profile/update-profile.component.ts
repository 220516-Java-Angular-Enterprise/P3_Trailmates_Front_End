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
    //username: [null, [Validators.required, Validators.minLength(3)], this.authService.validateUsernameNotTaken.bind(this.authService)],
    // password: ['', Validators.required],
    // email: ['', Validators.required],
     bio: ['', [Validators.required, Validators.maxLength(255)]],
  })
  
  get username() {
    return this.updateUserReq.get('username')
  }

  get password() {
    return this.updateUserReq.get('password')
  }

  get email() {
    return this.updateUserReq.get('email')
  }

  get bio() {
    return this.updateUserReq.get('bio')
  }

  public user: User = {id: "", username: "", password: "", email: "", role: "", bio: "", age: null}
  
  placeholders = {
    username: "Enter Username",
    password: "Enter Password",
    email: "Enter Email",
    bio: "Enter Bio",
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
    this.user.bio = this.updateUserReq.get('bio')?.value as unknown as string
    

    if(this.updateUserReq.status == 'VALID'){
      this.userService.UpdateUser(this.user).subscribe(data =>{
        this.user = data
        console.log(this.user)
      })
    }else{
      this.displayFormSubmitError = true
    }
    
    console.log("NNNEEEEWWWWW " + this.user.bio)
    
  }

  @Input() popup:boolean = true; 

  @Output() doPassPopup:EventEmitter<any> = new EventEmitter();

  close() {
    this.popup = false;
    this.doPassPopup.emit(this.popup);
  } 

}