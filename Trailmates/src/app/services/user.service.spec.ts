import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service.service';

describe('UserServiceService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

  // public ROOT_URL = 'https://revature.trailmates.net/TrailMates/user/';

  // getUserByUsername(username: string): Observable < User > {
  //   return this.http.get<User>(this.ROOT_URL + `user-username/${username}`);
  // }

  // getAllUsers(): Observable < User[] > {
  //   return this.http.get<User[]>(this.ROOT_URL + "all-users");
  // }

  // UpdateUser(updatedUser: User): Observable < User > {
  //   return this.http.put<User>(this.ROOT_URL + 'edit', updatedUser);
  // }
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get user by id'), () => {
    service.getUserById('fakeid').subscribe();

    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === 'https://revature.trailmates.net/TrailMates/user/user-id/fakeid')
    
      request.flush(1);
  }

  it('get user by username'), () => {
    service.getUserByUsername('fakeusername').subscribe();
    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === 'https://revature.trailmates.net/TrailMates/user/user-username/fakeid')

    request.flush(1); 
  })


  
});
