import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrailParkComponent } from './search-trail-park.component';

describe('SearchTrailParkComponent', () => {
  let component: SearchTrailParkComponent;
  let fixture: ComponentFixture<SearchTrailParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrailParkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrailParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
