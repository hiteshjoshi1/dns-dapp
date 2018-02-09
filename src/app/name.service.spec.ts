import { TestBed, inject } from '@angular/core/testing';

import { NameService } from './name.service';

describe('NameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NameService]
    });
  });

  it('should be created', inject([NameService], (service: NameService) => {
    expect(service).toBeTruthy();
  }));
});
