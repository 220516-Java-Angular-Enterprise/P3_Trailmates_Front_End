import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TrailService } from './trail.service';

describe('TrailService', () => {
  let service: TrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(TrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
