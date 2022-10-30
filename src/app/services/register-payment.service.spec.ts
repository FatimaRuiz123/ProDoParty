import { TestBed } from '@angular/core/testing';

import { RegisterPaymentService } from './register-payment.service';

describe('RegisterPaymentService', () => {
  let service: RegisterPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
