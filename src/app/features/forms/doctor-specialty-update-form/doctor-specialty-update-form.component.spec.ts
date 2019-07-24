import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSpecialtyUpdateFormComponent } from './doctor-specialty-update-form.component';

describe('DoctorSpecialtyUpdateFormComponent', () => {
  let component: DoctorSpecialtyUpdateFormComponent;
  let fixture: ComponentFixture<DoctorSpecialtyUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSpecialtyUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSpecialtyUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
