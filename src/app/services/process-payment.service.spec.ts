import { TestBed } from '@angular/core/testing';

import { ProcessPaymentService } from './process-payment.service';

describe('ProcessPaymentService', () => {
  let service: ProcessPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
