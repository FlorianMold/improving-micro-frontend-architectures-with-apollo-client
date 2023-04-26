import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UiCommonVersionService<T> {
  private _versions: T[] = [];
  private _versions$ = new BehaviorSubject<T[]>(this._versions);

  /**
   * Registers the given versions inside the application.
   *
   * @param versions The versions to register.
   */
  register(versions: T[]): void {
    this._versions = this._versions.concat(versions);
    this._versions$.next(this._versions);
  }

  /**
   * Unregisters the given versions, if they match items inside the internal versions.
   *
   * @param unregisterVersion Versions that should be unregistered.
   * @param mapToString Function that maps the generic parameter to a comparable value.
   */
  unregister(unregisterVersion: T[], mapToString: (a: T) => string): void {
    this._versions = this._versions.filter((value) => !unregisterVersion.map(mapToString).includes(mapToString(value)));
    this._versions$.next(this._versions);
  }

  /**
   * Clears the versions-array.
   */
  clear(): void {
    this._versions = [];
    this._versions$.next(this._versions);
  }

  /**
   * Returns an observable that emits the registered versions.
   */
  getVersions$(): Observable<T[]> {
    return this._versions$.asObservable();
  }

  /** Returns the current value of the subject. */
  getVersions(): T[] {
    return this._versions$.getValue();
  }
}
