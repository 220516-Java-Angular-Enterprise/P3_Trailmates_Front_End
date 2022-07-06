import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiationsComponent } from './notifiations.component';

describe('NotifiationsComponent', () => {
  let component: NotifiationsComponent;
  let fixture: ComponentFixture<NotifiationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifiationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifiationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
