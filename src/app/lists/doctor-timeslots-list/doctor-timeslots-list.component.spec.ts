import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoctorTimeslotsListComponent} from './doctor-timeslots-list.component';

describe('DoctorTimeslotsListComponent', () => {
  let component: DoctorTimeslotsListComponent;
  let fixture: ComponentFixture<DoctorTimeslotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorTimeslotsListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTimeslotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
