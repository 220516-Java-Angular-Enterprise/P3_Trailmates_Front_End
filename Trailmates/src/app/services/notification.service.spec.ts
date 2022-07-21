import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpTest: HttpTestingController;
  const ROOT_URL: 'https://revature.trailmates.net/TrailMates/notification/'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(NotificationService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get notifications', () => {
    service.getAllNotifications().subscribe();
    const request = httpTest.expectOne(
      data => data.method === 'GET' && data.url === ROOT_URL)
      request.flush(1)
  })

  it('should delete', () => {
    service.deleteNotification('fakeid').subscribe();
    const request = httpTest.expectOne(data=>
      data.method === 'DELETE' && data.url === ROOT_URL + 'fakeid')
      request.flush(1)
  })
});
