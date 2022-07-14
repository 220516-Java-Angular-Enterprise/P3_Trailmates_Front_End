import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerAbilityComponent } from './hiker-ability.component';

describe('HikerAbilityComponent', () => {
  let component: HikerAbilityComponent;
  let fixture: ComponentFixture<HikerAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
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
