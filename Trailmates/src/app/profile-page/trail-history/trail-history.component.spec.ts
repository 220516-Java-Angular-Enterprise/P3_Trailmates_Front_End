import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailHistoryComponent } from './trail-history.component';

describe('TrailHistoryComponent', () => {
  let component: TrailHistoryComponent;
  let fixture: ComponentFixture<TrailHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
