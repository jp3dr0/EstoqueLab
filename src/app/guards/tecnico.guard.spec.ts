import { TestBed, async, inject } from '@angular/core/testing';

import { TecnicoGuard } from './tecnico.guard';

describe('TecnicoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TecnicoGuard]
    });
  });

  it('should ...', inject([TecnicoGuard], (guard: TecnicoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
