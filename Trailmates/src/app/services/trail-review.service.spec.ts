import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user';

import { TrailReviewService } from './trail-review.service';
import { AuthService } from './auth.service';

describe('TrailReviewService', () => {
  let service: TrailReviewService;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(TrailReviewService);

    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all trail reviews of 3604914F-0D84-46EC-9276-FAA4EFC55BA9', () => {

    service.getAllTrailsReviews('3604914F-0D84-46EC-9276-FAA4EFC55BA9').subscribe((trails) => {
    })

    const request = httpTestingController.expectOne(data => 
      data.method === 'GET' && data.url ==='https://revature.trailmates.net/TrailMates/trailreview/avg/3604914F-0D84-46EC-9276-FAA4EFC55BA9'
    );
    request.flush({trailID:'testTrail', ratingAvg:0, ratingCount:0})
  })

  it('should post new requst at 3604914F-0D84-46EC-9276-FAA4EFC55BA9', () => {

    service.postTrailReviews('3604914F-0D84-46EC-9276-FAA4EFC55BA9', { rating: 0, comment: '' }).subscribe((trails) => {
    })

    const request = httpTestingController.expectOne(data =>
      data.method === 'POST' && data.url === 'https://revature.trailmates.net/TrailMates/trailreview/3604914F-0D84-46EC-9276-FAA4EFC55BA9'
    );

    expect(request.request.body).toEqual({ rating: 0, comment: '' })
    request.flush(1)
  })
});
