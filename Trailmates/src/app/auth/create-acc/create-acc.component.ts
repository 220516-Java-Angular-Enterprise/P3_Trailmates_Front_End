import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.scss']
})
export class CreateAccComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  displayFormSubmitError: boolean = false;

  user: User = {
    id:"",
    username:"",
    password:"",
    email:"",
    bio:"",
    age:null
  };

  placeholders = {
<<<<<<< HEAD
    username: "",
    password: "",
    email: "",
    bio: "",
    age:null
=======
    username: "Enter Username",
    password: "Enter Password",
    email: "Enter Email",
    bio: "Enter Bio",
    age: "Enter Age"
>>>>>>> df9949519a37455b62cfc09084a13710466c6e37
  };

  ngOnInit(): void {
  }

  processForm(signupForm: NgForm){
    if(signupForm.form.status == 'VALID'){
      this.authService.signUp(this.user);
      this.router.navigateByUrl('/login');
    }
    else{
      this.displayFormSubmitError = true;
    }
  }
}
