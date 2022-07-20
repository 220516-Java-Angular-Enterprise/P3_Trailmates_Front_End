import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service.service';

describe('UserServiceService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const ROOT_URL = 'https://revature.trailmates.net/TrailMates/user/'

  const FAKE_USER = {
    id: 'FAKE_ID',
    username: 'FAKE_USERNAME',
    password: 'FAKE_PASSWORD',
    email: 'FAKE_EMAIL',
    role: 'FAKE_ROLE',
    bio: 'FAKE_BIO',
    age: 25,
    profilepic: 'FAKE_PIC'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

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


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get user by id', () => {
    service.getUserById('fakeid').subscribe();

    const request = httpTestingController.expectOne(data =>
      data.method === 'GET' && data.url === ROOT_URL + 'user-id/fakeid'
      );

    // mocks response. 1 is the response we are returning to mock
    request.flush(1);
  });

it('get user by username', () => {
  service.getUserByUsername('fakeusername').subscribe();
  const request = httpTestingController.expectOne(data =>
    data.method === 'GET' && data.url === ROOT_URL + 'user-username/fakeusername')

  request.flush(1);
})

it('get all user'), () => {
  service.getAllUsers().subscribe();
  const request = httpTestingController.expectOne(data =>
    data.method === 'GET' && data.url === ROOT_URL + 'all-users')
}

it('update users'), () => {
  service.UpdateUser(FAKE_USER).subscribe()

  const request = httpTestingController.expectOne(data =>
    data.method === 'PUT' && data.url === ROOT_URL + 'edit', 
  )

  expect(request.request.body).toEqual({
    id: 'FAKE_ID',
    username: 'FAKE_USERNAME',
    password: 'FAKE_PASSWORD',
    email: 'FAKE_EMAIL',
    role: 'FAKE_ROLE',
    bio: 'FAKE_BIO',
    age: 25,
    profilepic: 'FAKE_PIC'
  })
  request.flush(1);
}


});
