import { TestBed } from '@angular/core/testing';

import { TrailReviewService } from './trail-review.service';

describe('TrailReviewService', () => {
  let service: TrailReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
