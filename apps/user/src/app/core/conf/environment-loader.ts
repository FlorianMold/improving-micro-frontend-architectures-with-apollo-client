import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UiEnvironmentIdentifier, UiEnvironmentLoaderService } from '@ui-frontend-service/shared/feature/common-services';

@Injectable()
export class UiUserEnvironmentLoaderService implements UiEnvironmentLoaderService {
  private _config = new Map<UiEnvironmentIdentifier, unknown>();

  constructor(private readonly http: HttpClient) {}

  async storeResource(identifier: string, configPath: string): Promise<void> {
    const environmentConfig = await lastValueFrom(this.http.get<unknown>(configPath));
    this._config.set(identifier, environmentConfig);
  }

  get configMap(): Map<UiEnvironmentIdentifier, unknown> {
    return this._config;
  }

  getConfigurationValue(key: UiEnvironmentIdentifier): unknown {
    return this._config.get(key);
  }
}
