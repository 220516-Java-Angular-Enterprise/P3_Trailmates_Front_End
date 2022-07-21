import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TrailFlagService } from './trail-flag.service';

describe('TrailFlagService', () => {
  let service: TrailFlagService;
  let httpTestingController: HttpTestingController;
  const trailFlagReq = {
    trailId: 'FAKE_',
    dateInt: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrailFlagService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  const ROOT_URL = 'https://revature.trailmates.net/TrailMates/flag'

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('post trail flags', () => {
    service.postTrailFlag(trailFlagReq).subscribe();
    const request = httpTestingController.expectOne(data =>
      data.method === 'POST' && data.url === ROOT_URL)
    request.flush(1);
    expect(request.request.body).toEqual({
      trailId: 'FAKE_',
      dateInt: 0
    })
  })

  it('get all by trail', () => {
    service.getAllByTrail('faketrail').subscribe();
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + '/trail/faketrail')
    request.flush(1);
  })


});
