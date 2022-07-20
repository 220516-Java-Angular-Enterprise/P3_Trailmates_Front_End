import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FriendService } from './friend.service';
import { HttpClient } from '@angular/common/http';

describe('FriendService', () => {
  let service: FriendService;
  let http: HttpClient;
  let httpController: HttpTestingController;
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
});
