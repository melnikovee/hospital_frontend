import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateFormComponent } from './doctor-update-form.component';

describe('DoctorUpdateFormComponent', () => {
  let component: DoctorUpdateFormComponent;
  let fixture: ComponentFixture<DoctorUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
