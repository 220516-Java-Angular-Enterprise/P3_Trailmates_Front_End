
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailComponent } from './trail.component';

describe('TrailComponent', () => {
  let component: TrailComponent;
  let fixture: ComponentFixture<TrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TrailComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
