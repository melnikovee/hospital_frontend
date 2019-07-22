import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateScheduleFormComponent} from './create-schedule-form.component';

describe('CreateScheduleFormComponent', () => {
  let component: CreateScheduleFormComponent;
  let fixture: ComponentFixture<CreateScheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateScheduleFormComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
