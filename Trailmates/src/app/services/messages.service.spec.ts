import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let httpTest: HttpTestingController;
  const ROOT_URL = 'https://revature.trailmates.net/TrailMates/';
  const convoReq = {
    name: 'fakeName',
    userIDs: ['fakeid', 'fakeid2'],
  };
  const messageReq = {
    message: 'fakeMessage',
    time_sent: 0,
    converastion_id: 'fakeid'
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MessagesService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get convo', () =>{
    service.getPrivateMessagesByConvoName('fakeid').subscribe();
    const request = httpTest.expectOne(
      (data) =>
        data.method === 'GET' &&
        data.url === ROOT_URL + 'private-message/conversation/fakeid'
    );
    request.flush(1)
  })

  it('should get convos', () =>{
    service.getExistingConvos().subscribe();
    const request = httpTest.expectOne(
      (data) =>
        data.method === 'GET' &&
        data.url === ROOT_URL + 'owned-conversation/active'
    );
    request.flush(1)
  })

  it('should create convo', () =>{
    service.createNewGroup(convoReq).subscribe();
    const request = httpTest.expectOne(
      (data) =>
        data.method === 'POST' &&
        data.url === ROOT_URL + 'conversation/new-conversation'
    );
    request.flush(1)
  })

  it('should post message', ()=>{
    service.postNewMessage(messageReq).subscribe();
    const request = httpTest.expectOne(
      (data) =>
        data.method === 'POST' && data.url === ROOT_URL + 'private-message'
    );
    request.flush(1)
  })
});
