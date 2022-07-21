import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PendingFriendsComponent } from './pending-friends.component';

describe('PendingFriendsComponent', () => {
  let component: PendingFriendsComponent;
  let fixture: ComponentFixture<PendingFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PendingFriendsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
