import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FlagsComponent } from './flags.component';

describe('FlagsComponent', () => {
  let component: FlagsComponent;
  let fixture: ComponentFixture<FlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ FlagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
