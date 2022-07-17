import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserFriendsComponent } from './other-user-friends.component';

describe('OtherUserFriendsComponent', () => {
  let component: OtherUserFriendsComponent;
  let fixture: ComponentFixture<OtherUserFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherUserFriendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUserFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
