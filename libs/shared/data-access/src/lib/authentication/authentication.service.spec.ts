import { TestBed } from '@angular/core/testing';

import { UiAuthenticationDataAccessServiceImpl } from './authentication.service';

xdescribe('AuthenticationService', () => {
  let service: UiAuthenticationDataAccessServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiAuthenticationDataAccessServiceImpl],
    });
    service = TestBed.inject(UiAuthenticationDataAccessServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
