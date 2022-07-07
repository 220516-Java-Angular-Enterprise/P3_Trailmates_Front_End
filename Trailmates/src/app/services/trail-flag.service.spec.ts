import { TestBed } from '@angular/core/testing';

import { TrailFlagService } from './trail-flag.service';

describe('TrailFlagService', () => {
  let service: TrailFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
