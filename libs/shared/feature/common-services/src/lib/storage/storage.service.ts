import { Inject, Injectable } from '@angular/core';
import { UI_COMMON_BROWSER_STORAGE } from './storage.token';

@Injectable()
export class UiCommonStorageService {
  constructor(@Inject(UI_COMMON_BROWSER_STORAGE) private storage: Storage) {}

  /**
   * The clear() method of the Storage interface clears all keys stored in a given Storage object.
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * The key() method of the Storage interface, when passed a number n,
   * returns the name of the nth key in a given Storage object.
   * The order of keys is user-agent defined, so you should not rely on it.
   *
   * @param index n integer representing the number of the key you want to get the name of. This is a zero-based index.
   */
  key(index: number): string | null {
    return this.storage.key(index);
  }

  /**
   * The setItem() method of the Storage interface, when passed a key name and value, will add that key to the
   * given Storage object, or update that key's value if it already exists.
   *
   * @param key A DOMString containing the name of the key you want to create/update.
   * @param value A DOMString containing the value you want to give the key you are creating/updating.
   */
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  /**
   * The getItem() method of the Storage interface, when passed a key name, will return that key's value,
   * or null if the key does not exist, in the given Storage object
   *
   * @param key DOMString containing the name of the key you want to retrieve the value of.
   */
  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  /**
   * The removeItem() method of the Storage interface, when passed a key name, will remove that key from
   * the given Storage object if it exists. The Storage interface of the Web Storage API
   * provides access to a particular domain's session or local storage.
   * If there is no item associated with the given key, this method will do nothing.
   *
   * @param key A DOMString containing the name of the key you want to remove.
   */
  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  /**
   * Set the storage-method of the service.
   *
   * @param storage The storage-method to use.
   */
  setStorage(storage: Storage): void {
    this.storage = storage;
  }
}
