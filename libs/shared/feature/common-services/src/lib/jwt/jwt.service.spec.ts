import { TestBed } from '@angular/core/testing';

import { UiCommonJwtService } from './jwt.service';

describe('JwtService', () => {
  let service: UiCommonJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiCommonJwtService],
    });
    service = TestBed.inject(UiCommonJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
