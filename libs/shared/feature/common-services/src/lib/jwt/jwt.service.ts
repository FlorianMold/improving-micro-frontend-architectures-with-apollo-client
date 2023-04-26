import { inject, Injectable } from '@angular/core';
import { UiCommonLocalStorageService, UiCommonSessionStorageService } from '../storage';

@Injectable()
export class UiCommonJwtService {
  private _localStorageService = inject(UiCommonLocalStorageService);
  private _sessionStorageService = inject(UiCommonSessionStorageService);

  /**
   * Retrieves the jwt-token from storage.
   */
  getToken(): string | null {
    return this._localStorageService.getItem('jwtToken') ?? this._sessionStorageService.getItem('jwtToken');
  }

  /**
   * Saves the jwt-token to the storage.
   *
   * @param token The token to store.
   */
  saveToken(token: string) {
    const stayLoggedIn = this._localStorageService.getItem('stayLoggedIn') ?? this._sessionStorageService.getItem('stayLoggedIn');
    const storage = stayLoggedIn === 'true' ? this._localStorageService : this._sessionStorageService;

    this._localStorageService.clear();
    this._sessionStorageService.clear();
    storage.setItem('jwtToken', token);
    storage.setItem('stayLoggedIn', stayLoggedIn ?? 'false');
  }

  /**
   * Removes the jwt-token from the storage.
   */
  destroyToken() {
    this._localStorageService.removeItem('jwtToken');
    this._localStorageService.removeItem('stayLoggedIn');

    this._sessionStorageService.removeItem('jwtToken');
    this._sessionStorageService.removeItem('stayLoggedIn');
  }
}
