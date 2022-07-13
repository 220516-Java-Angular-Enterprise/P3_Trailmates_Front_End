import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';

import { UserService } from './user-service.service';

describe('UserServiceService', () => {
  let userService: UserService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(userService).toBeDefined();
  });

  // it('should get all users', () => {
  //   const
  // });

});
