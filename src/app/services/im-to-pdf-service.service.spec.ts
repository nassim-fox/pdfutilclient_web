import { TestBed } from '@angular/core/testing';

import { ImToPdfService } from './im-to-pdf-service.service';

describe('ImToPdfService', () => {
  let service: ImToPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImToPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
