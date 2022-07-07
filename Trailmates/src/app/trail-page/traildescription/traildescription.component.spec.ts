import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraildescriptionComponent } from './traildescription.component';

describe('TraildescriptionComponent', () => {
  let component: TraildescriptionComponent;
  let fixture: ComponentFixture<TraildescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraildescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraildescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
