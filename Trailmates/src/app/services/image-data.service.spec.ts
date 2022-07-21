import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ImageDataService } from './image-data.service';

describe('ImageDataService', () => {
  let service: ImageDataService;
  let httpTest: HttpTestingController;
  const ROOT_URL = 'https://revature.trailmates.net/TrailMates/image/'
  const imageReq = {
    time_sent: new Date(),
    conversation: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ImageDataService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get img', () => {
    service.getLatestProfilePic('fakeid').subscribe();
    const request = httpTest.expectOne(
      data=> data.method==="GET"&&data.url===ROOT_URL+"profpic/fakeid"
    )
  });

  it('should save img', () => {
    service.saveImg(imageReq).subscribe();
    const request = httpTest.expectOne(
      (data) => data.method === 'POST' && data.url === ROOT_URL
    );
    request.flush(1);
  });


});
