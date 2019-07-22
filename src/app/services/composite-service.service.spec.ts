import {TestBed} from '@angular/core/testing';

import {CompositeService} from './composite-service.service';

describe('CompositeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompositeService = TestBed.get(CompositeService);
    expect(service).toBeTruthy();
  });
});
