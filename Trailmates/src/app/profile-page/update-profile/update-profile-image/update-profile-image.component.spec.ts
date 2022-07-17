import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateProfileImageComponent } from './update-profile-image.component';
import { FormsModule } from '@angular/forms';


describe('UpdateProfileImageComponent', () => {
  let component: UpdateProfileImageComponent;
  let fixture: ComponentFixture<UpdateProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ UpdateProfileImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
