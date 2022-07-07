import { TestBed } from '@angular/core/testing';

import { TrailHistoryService } from './trail-history.service';

describe('TrailHistoryService', () => {
  let service: TrailHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
