import { TestBed } from '@angular/core/testing';

import {DoctorSpecialtyService} from './doctorspecialty-service.service';

describe('DoctorSpecialtyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorSpecialtyService = TestBed.get(DoctorSpecialtyService);
    expect(service).toBeTruthy();
  });
});
