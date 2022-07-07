import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrailStateComponent } from './search-trail-state.component';

describe('SearchTrailStateComponent', () => {
  let component: SearchTrailStateComponent;
  let fixture: ComponentFixture<SearchTrailStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ SearchTrailStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrailStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
