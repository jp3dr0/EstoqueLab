import { TestBed } from '@angular/core/testing';

import { ReagenteService } from './reagente.service';

describe('ReagenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReagenteService = TestBed.get(ReagenteService);
    expect(service).toBeTruthy();
  });
});
