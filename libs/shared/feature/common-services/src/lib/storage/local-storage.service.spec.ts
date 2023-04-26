import { TestBed } from '@angular/core/testing';
import { UiCommonLocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: UiCommonLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiCommonLocalStorageService],
    });
    service = TestBed.inject(UiCommonLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
