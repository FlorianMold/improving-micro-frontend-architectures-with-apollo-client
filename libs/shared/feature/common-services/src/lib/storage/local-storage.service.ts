import { Injectable } from '@angular/core';
import { UiCommonStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UiCommonLocalStorageService extends UiCommonStorageService {
  constructor() {
    super(localStorage);
  }
}
