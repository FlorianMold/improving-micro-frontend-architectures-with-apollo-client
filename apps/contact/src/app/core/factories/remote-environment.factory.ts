import { UiContactEnvironmentLoaderService } from '../conf';
import { UI_CONTACT_APP_NAME } from '../../app-config.const';

export const remoteEnvironmentFactory = (envService: UiContactEnvironmentLoaderService) => {
  return () => envService.storeResource(UI_CONTACT_APP_NAME, 'assets/settings.json');
};
