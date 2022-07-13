import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccComponent } from './create-acc.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('CreateAccComponent', () => {
  let component: CreateAccComponent;
  let fixture: ComponentFixture<CreateAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ CreateAccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.processForm).toBeTruthy();
  });
});
