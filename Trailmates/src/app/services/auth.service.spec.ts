import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTest: HttpTestingController
  const loginReq = {
    username: 'fakeusername',
    password: 'P@ssw0rd'
  }
  const signupReq = {
    username: 'fakeusername',
    password: 'P@ssw0rd',
    age: '18',
    bio: 'bio',
    email: 'email@gmail.com'
  }
  const ROOT_URL = "https://revature.trailmates.net/TrailMates/auth"

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [
      HttpClientTestingModule,
      RouterTestingModule]});
    service = TestBed.inject(AuthService);
    httpTest = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', ()=>{
    service.login(loginReq).subscribe();
    const request = httpTest.expectOne(
      data => 
        data.method==='POST'&&data.url===ROOT_URL
    )
    request.flush(1)
  })

  it('should signup', ()=>{
    service.signUp(signupReq).then();
    const request = httpTest.expectOne(
      data=> data.method==='POST'&&data.url===ROOT_URL+'/newuser'
    )
    request.flush(1);
  })



  
});
