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
  id: string | null = localStorage.getItem('id');

  public user!: User;
  public updateUserReq: FormGroup<any>;
  
  placeholders = {
    email: "Enter Email",
    age: "Enter Age",
    bio: "Enter Bio",
  }

  displayFormSubmitError: boolean = false;
  displayFormSuccess: boolean = false;

  ngOnInit(): void {

    this.userService.getUserById(this.id as string).subscribe((data) => {
      this.user = data
      console.log('Updated user for this page', this.user)
    })
  }

  constructor(private userService: UserService, private authService: AuthService, private fb: FormBuilder) {
    
    this.updateUserReq = this.fb.group({
      emailControl: ['', Validators.minLength(1)],
      bioControl: ['', Validators.maxLength(254)],
      ageControl: [Number(), Validators.min(0)]
    })

  }

  get email() {
    return this.updateUserReq.get('emailControl')
  }

  get bio() {
    return this.updateUserReq.get('bioControl')
  }

  get age() {
    return this.updateUserReq.get('ageControl')
  }
  
  onSubmit() {
    console.log('User',this.user,'being edited')

    this.user.email = this.email?.value as string
    this.user.bio = this.bio?.value as string
    this.user.age = this.age?.value as number

    if(this.updateUserReq.status == 'VALID'){
      this.userService.UpdateUser(this.user).subscribe(data =>{
        this.user = data
        console.log(this.user)
        this.displayFormSuccess = true;
        this.close()
      })
    } else{
      this.displayFormSubmitError = true
    }
    
  }

  @Input() popup:boolean = true; 

  @Output() doPassPopup:EventEmitter<any> = new EventEmitter();

  close() {
    this.popup = false;
    this.doPassPopup.emit(this.popup);
  } 

}