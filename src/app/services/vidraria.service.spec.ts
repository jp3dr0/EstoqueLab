import { TestBed } from '@angular/core/testing';

import { VidrariaService } from './vidraria.service';

describe('VidrariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VidrariaService = TestBed.get(VidrariaService);
    expect(service).toBeTruthy();
  });
});
