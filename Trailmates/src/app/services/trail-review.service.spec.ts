import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TrailReviewService } from './trail-review.service';

describe('TrailReviewService', () => {
  let service: TrailReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(TrailReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
