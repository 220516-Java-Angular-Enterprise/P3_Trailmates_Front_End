import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {User} from '../models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientTestingModule, RouterTestingModule],
     providers: [AuthService],
    });
    
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(authService).toBeDefined();
  });

  it('token service', () => {

    const dummyPosts: User[] = [
      {
        id :'1',
        username : 'Moekse291',
        password : 'P@ss0rd',
        email : 'Moekse291@gmail.com',
        role: 'Default',
        bio :'Hello ',
        age: 19
      }
    ];
  });
});
