import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDiagnosisFormComponent } from './dialog-diagnosis-form.component';

describe('DialogDiagnosisFormComponent', () => {
  let component: DialogDiagnosisFormComponent;
  let fixture: ComponentFixture<DialogDiagnosisFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDiagnosisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDiagnosisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
