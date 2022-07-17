import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ImageDataService } from './image-data.service';

describe('ImageDataService', () => {
  let service: ImageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(ImageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
