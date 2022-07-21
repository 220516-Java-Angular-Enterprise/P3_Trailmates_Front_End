import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FriendService } from './friend.service';
import { HttpClient } from '@angular/common/http';

describe('FriendService', () => {
  let service: FriendService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  const ROOT_URL = 'https://revature.trailmates.net/TrailMates/friends/';
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [FriendService]
    });
    service = TestBed.inject(FriendService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get defined', () => {
    service.getAllFriends().subscribe();
    const request = httpController.expectOne(
      (data) => 
        data.method === 'GET' &&
        data.url === ROOT_URL
      
    )
    request.flush(1)
  })

  it('should get friends', () => {
    service.getAllFriendsByUserID('fakeid').subscribe();
    const request = httpController.expectOne(
      (data) => 
        data.method === 'GET' &&
        data.url === ROOT_URL+'fakeid'
    )
    request.flush(1)
  })

  it('should get pending', () => {
    service.getAllPending().subscribe();
    const request = httpController.expectOne(
      (data) => 
        data.method === 'GET' &&
        data.url === ROOT_URL+'pending'
    )
    request.flush(1)
  })

  it('should get remove', () => {
    service.removeFreind("fakeid").subscribe();
    const request = httpController.expectOne(
      (data) => 
        data.method === 'DELETE' &&
        data.url === ROOT_URL+'fakeid'
    )
    request.flush(1)
  })

  it('should get add', () => {
    service.addFriend("fakeid").subscribe();
    const request = httpController.expectOne(
      (data) => 
        data.method === 'POST' &&
        data.url === ROOT_URL+'fakeid'
    )
    request.flush(1)
  })



});
