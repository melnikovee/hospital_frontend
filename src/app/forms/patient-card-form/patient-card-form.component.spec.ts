import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardFormComponent } from './patient-card-form.component';

describe('PatientCardFormComponent', () => {
  let component: PatientCardFormComponent;
  let fixture: ComponentFixture<PatientCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
