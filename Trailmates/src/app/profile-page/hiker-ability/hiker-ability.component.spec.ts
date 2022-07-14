import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerAbilityComponent } from './hiker-ability.component';

describe('HikerAbilityComponent', () => {
  let component: HikerAbilityComponent;
  let fixture: ComponentFixture<HikerAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HikerAbilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HikerAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
