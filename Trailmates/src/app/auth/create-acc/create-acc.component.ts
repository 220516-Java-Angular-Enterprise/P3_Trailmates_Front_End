import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserMenuComponent } from 'src/app/header/user-menu/user-menu.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.scss']
})
export class CreateAccComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private userService:UserService) {}

  signupForm = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(3)], this.authService.validateUsernameNotTaken.bind(this.authService)],
    password: ['', Validators.required],
    email: ['', Validators.required],
    bio: ['', [Validators.maxLength(255)]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(99)]]

  })

  get username() {
    return this.signupForm.get('username')
  }
  get password() {
    return this.signupForm.get('password')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get bio() {
    return this.signupForm.get('bio')
  }
  get age() {
    return this.signupForm.get('age')
  }

  displayFormSubmitError: boolean = false;

  user: User = {
    id:"",
    username: "",
    password:"",
    email:"",
    bio:"",
    age:null
  };

  placeholders = {
    username: "Enter Username",
    password: "Enter Password",
    email: "Enter Email",
    bio: "Enter Bio",
    age: "Enter Age"
  };

  ngOnInit(): void {}

  onSubmit(){
    console.log(this.signupForm.value)
    if(this.signupForm.status == 'VALID'){
      this.authService.signUp(this.signupForm.value)
      this.router.navigateByUrl('/login');
    }
    else{
      this.displayFormSubmitError = true;
    }
  }
}
