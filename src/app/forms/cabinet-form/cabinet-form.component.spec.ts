import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetFormComponent } from './cabinet-form.component';

describe('CabinetFormComponent', () => {
  let component: CabinetFormComponent;
  let fixture: ComponentFixture<CabinetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabinetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
