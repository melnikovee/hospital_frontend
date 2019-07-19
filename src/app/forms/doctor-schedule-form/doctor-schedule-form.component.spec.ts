import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleFormComponent } from './doctor-schedule-form.component';

describe('DoctorScheduleFormComponent', () => {
  let component: DoctorScheduleFormComponent;
  let fixture: ComponentFixture<DoctorScheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorScheduleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
