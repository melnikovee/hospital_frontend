import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPatientFormComponent } from './searchpatient-form.component';

describe('SearchPatientFormComponent', () => {
  let component: SearchPatientFormComponent;
  let fixture: ComponentFixture<SearchPatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPatientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
