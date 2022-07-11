import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailCommentsComponent } from './trail-comments.component';

describe('TrailCommentsComponent', () => {
  let component: TrailCommentsComponent;
  let fixture: ComponentFixture<TrailCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
