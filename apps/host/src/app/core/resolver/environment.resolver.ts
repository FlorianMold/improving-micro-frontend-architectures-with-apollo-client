import { HOST_MANIFEST_IDENTIFIER } from '../factories';
import { UI_HOST_REMOTES } from '../../app-config.const';
import { inject } from '@angular/core';
import { UiEnvironmentLoaderService } from '@ui-frontend-service/shared/feature/common-services';

/**
 * The possible remote-urls.
 */
type UiRemoteUrls = { contact: string; sales: string; dashboard: string; user: string };

/**
 * Ensures that the settings for the provided remote environment are loaded.
 *
 * @param remote - the remote host to resolve the environment for
 */
export function resolveEnvironment(remote: UI_HOST_REMOTES) {
  const environmentLoader = inject(UiEnvironmentLoaderService);

  /** Resolve immediately, if the remote-settings have already been loaded. */
  const remoteEnvironment = environmentLoader.getConfigurationValue(remote);
  if (remoteEnvironment) {
    return Promise.resolve();
  }

  const urls = environmentLoader.getConfigurationValue(HOST_MANIFEST_IDENTIFIER) as UiRemoteUrls;
  const remoteUrl = urls[remote];

  return environmentLoader.storeResource(remote, `${remoteUrl}/assets/settings.json`);
}
