import { UiUserEnvironmentLoaderService } from '../conf';
import { UI_USER_APP_NAME } from '../../app-config.const';

export const remoteEnvironmentFactory = (envService: UiUserEnvironmentLoaderService) => {
  return () => envService.storeResource(UI_USER_APP_NAME, 'assets/settings.json');
};
