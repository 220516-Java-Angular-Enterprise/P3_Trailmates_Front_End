import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { flush, TestBed } from '@angular/core/testing';

import { TrailService } from './trail.service';

describe('TrailService', () => {
  let service: TrailService;
  let httpTestingController: HttpTestingController;
  const ROOT_URL = 'https://revature.trailmates.net/TrailMates/trail/'
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrailService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all trails', () => {
    service.getAllTrails().subscribe()
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + 'getAll')
    request.flush(1)
  })

  it('get by name', () => {
    service.getByName('fakename').subscribe()
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + 'search/0/fakename')

    request.flush(1)
  })

  it('get by state', () => {
    service.getByState('fakestate').subscribe()
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + 'searchState/0/fakestate')

    request.flush(1)
  })

  it('get by park', () => {
    service.getByPark('fakepark').subscribe()
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + 'searchPark/0/fakepark')

    request.flush(1)
  })

  it('get by id', () => {
    service.getById('fakeid').subscribe()
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + 'fakeid')

    request.flush(1)
  })
  
});
