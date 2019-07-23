import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeslotsListComponent} from './timeslots-list.component';

describe('TimeslotsListComponent', () => {
  let component: TimeslotsListComponent;
  let fixture: ComponentFixture<TimeslotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeslotsListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
