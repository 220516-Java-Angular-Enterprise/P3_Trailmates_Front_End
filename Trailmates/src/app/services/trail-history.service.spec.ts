import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';



import { TrailHistoryService } from './trail-history.service';

describe('TrailHistoryService', () => {
  let service: TrailHistoryService;
  let httpTestingController: HttpTestingController;
  const ROOT_URL = "https://revature.trailmates.net/TrailMates/history";
  const historyReq = {
    trail_name: 'FAKE_TRAIL',
    comment: 'FAKE_COMMENT',
    date: 'FAKE_DATE',
    imageURL: 'FAKE_URL',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(TrailHistoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud get history of user', () => {
    service.getHistoryAsc('fakeuserid').subscribe();
    const request = httpTestingController.expectOne(data => 
      data.method === 'GET' && data.url === ROOT_URL + '/asc/fakeuserid' )
    request.flush(1);
  })

  it('shoud insert', () => {
    service.insertNewHistory(historyReq).subscribe();
    const request = httpTestingController.expectOne(data =>
      data.method === 'POST' && data.url === ROOT_URL + '/newHistory')
    request.flush(1);
  })
});
