import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordByDoctorFormComponent } from './patient-record-by-doctor-form.component';

describe('PatientRecordByDoctorFormComponent', () => {
  let component: PatientRecordByDoctorFormComponent;
  let fixture: ComponentFixture<PatientRecordByDoctorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRecordByDoctorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRecordByDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
