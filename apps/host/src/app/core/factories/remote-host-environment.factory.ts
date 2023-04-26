import { UI_HOST_APP_NAME } from '../../app-config.const';
import { UiEnvironmentLoaderService } from '@ui-frontend-service/shared/feature/common-services';

/** The name to store inside the environment-loader. */
export const HOST_SETTINGS_IDENTIFIER = UI_HOST_APP_NAME;
/** The name of the module-federation.manifest.json inside the environment-loader. */
export const HOST_MANIFEST_IDENTIFIER = 'host-manifest';

/**
 * Loads the remote-manifest and the settings for the host-application.
 * Stores the loaded configuration inside the environment-loader.
 *
 * @param envService
 */
export const remoteEnvironmentFactory = (envService: UiEnvironmentLoaderService) => {
  return async () => {
    await envService.storeResource(HOST_MANIFEST_IDENTIFIER, 'assets/module-federation.manifest.json');
    return envService.storeResource(HOST_SETTINGS_IDENTIFIER, 'assets/settings.json');
  };
};
