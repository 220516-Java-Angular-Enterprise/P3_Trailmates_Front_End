import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TrailHistoryService } from './trail-history.service';

describe('TrailHistoryService', () => {
  let service: TrailHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(TrailHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
