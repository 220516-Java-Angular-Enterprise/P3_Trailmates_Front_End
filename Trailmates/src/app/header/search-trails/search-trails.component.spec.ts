import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrailsComponent } from './search-trails.component';

describe('SearchTrailsComponent', () => {
  let component: SearchTrailsComponent;
  let fixture: ComponentFixture<SearchTrailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
